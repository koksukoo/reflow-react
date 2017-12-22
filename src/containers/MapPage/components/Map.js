import React from 'react';
import PropTypes from 'prop-types';
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import * as R from 'ramda';
import { setNextYear } from 'containers/MapPage/actions';
import { drawArcs, setLineColor } from 'utils/svg';
import world from 'data/world.json';
import { mapConfig } from '../constants';
import Country from './Country';
import MapWrapper from './MapWrapper';
import StyledMap from './StyledMap';
import SliderWrapper from './SliderWrapper';
import SliderHandle from './SliderHandle';
import YearOutput from './YearOutput';
import ColorHint from './ColorHint';
import PlayButton from './PlayButton';
import SliderTrack from './SliderTrack';

const SelectedProjection = geoNaturalEarth1;
let sliderMoveIntervalId;

class Map extends React.PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.state = { svgWidth: null, svgHeight: null, isPlaying: false };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  projection(argWidth = mapConfig.width, argHeight = mapConfig.height) {
    const width = argWidth || mapConfig.width;
    const height = argHeight || mapConfig.height;
    return SelectedProjection()
      .scale(width / mapConfig.scalars.scale)
      .translate([
        width / mapConfig.scalars.width,
        height / mapConfig.scalars.height,
      ]);
  }

  updateDimensions() {
    if (!this.svgParent) {
      return;
    }
    const newWidth = Math.min(this.svgParent.offsetWidth, mapConfig.width);
    const newHeight = Math.min(this.svgParent.offsetHeight, mapConfig.height);

    this.setState({
      svgWidth: newWidth - 10,
      svgHeight: newHeight - 30,
    });

    SelectedProjection()
      .scale([(newWidth - 10) / mapConfig.scalars.scale])
      .translate([newWidth / mapConfig.scalars.width, (newHeight - 30) / mapConfig.scalars.height]);
  }

  togglePlaying() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
    setTimeout(() => {
      if (this.state.isPlaying) {
        sliderMoveIntervalId = setInterval(() => {
          // change year every 5s
          this.props.dispatch(setNextYear());
        }, 3000);
      } else {
        clearInterval(sliderMoveIntervalId);
      }
    }, 10);
  }

  render() {
    const {
      selectedCountry,
      initialized,
      onCountrySelect,
      years,
      changeYear,
      traffic,
      countryMax,
      onCountryHovered,
      onSetTooltipPosition,
    } = this.props;

    const geoData = feature(world, world.objects.ne_110m_admin_0_countries)
      .features;
    geoData.forEach((d) => {
      d.centroid = // eslint-disable-line no-param-reassign
      this.projection(this.state.svgWidth, this.state.svgHeight)(geoCentroid(d));
    });

    const sliderMarks = initialized ? {
      [+years.min]: years.min,
      [+years.max]: years.max,
    } : {};

    return (
      <MapWrapper loading={!initialized} innerRef={(n) => { this.svgParent = n; }}>
        <StyledMap
          innerRef={(n) => { this.svg = n; }}
          style={{ width: this.state.svgWidth, height: this.state.svgHeight }}
          preserveAspectRatio="xMaxYMin meet"
        >
          <g className="countries" ref={(n) => { this.countries = n; }}>
            {geoData.map((d) =>
              (<Country
                key={`path-${d.properties.ADM0_A3}`}
                d={geoPath().projection(this.projection(this.state.svgWidth, this.state.svgHeight))(d)}
                className="country"
                isTarget={d.properties.NAME === selectedCountry}
                onClick={() => onCountrySelect(d.properties.NAME, d.properties.ADM0_A3)}
                onMouseOver={() => onCountryHovered(d.properties.NAME)}
                onFocus={() => onCountryHovered(d.properties.NAME)}
                onMouseOut={() => onCountryHovered(null)}
                onBlur={() => onCountryHovered(null)}
                onMouseMove={(event) => onSetTooltipPosition(event.pageY - 10, event.pageX + 10)}
              />))}
          </g>
          <g className="traffic" ref={(n) => { this.traffic = n; }} >
            {traffic && traffic.map((countryObj) => {
              const {
                country,
                countAsylum,
                countRefugee,
              } = countryObj;

              if (!country || country === 'Stateless') return true;

              const fromCountry = R.find(R.pathEq(['properties', 'NAME'], country))(geoData);
              const toCountry = R.find(R.pathEq(['properties', 'NAME'], selectedCountry))(geoData);
              const sumCount = (+countAsylum || 0) + (+countRefugee || 0);

              if (!fromCountry || !sumCount) return true;

              const coordinates = [
                fromCountry.centroid,
                toCountry.centroid,
              ];

              return ([
                <path
                  key={`o${Date.now() + coordinates[0][0]}`}
                  d={drawArcs(coordinates)}
                  className="arc"
                  stroke="black"
                  strokeWidth="3"
                  strokeOpacity="0.2"
                />,
                <path
                  key={`${Date.now() + coordinates[0][0]}`}
                  d={drawArcs(coordinates)}
                  className="arc"
                  stroke={setLineColor(sumCount, countryMax)}
                  strokeWidth="2"
                  strokeDasharray={this.state.isPlaying ? 10 : 0}
                />,
              ]);
            })}
          </g>
        </StyledMap>
        {!!initialized &&
        <SliderWrapper>
          <PlayButton togglePlaying={this.togglePlaying} isPlaying={this.state.isPlaying} />
          <SliderTrack>
            <ColorHint countryMax={countryMax} />
            <Slider
              min={+years.min}
              max={+years.max}
              marks={sliderMarks}
              defaultValue={+years.current}
              value={+years.current}
              handle={SliderHandle}
              onChange={changeYear}
            />
            <YearOutput>{years.current}</YearOutput>
          </SliderTrack>
        </SliderWrapper>
        }
      </MapWrapper>
    );
  }
}

Map.propTypes = {
  selectedCountry: PropTypes.string,
  initialized: PropTypes.bool,
  onCountrySelect: PropTypes.func,
  years: PropTypes.object,
  changeYear: PropTypes.func,
  traffic: PropTypes.array,
  countryMax: PropTypes.number,
  onCountryHovered: PropTypes.func,
  onSetTooltipPosition: PropTypes.func,
  dispatch: PropTypes.func,
};

export default Map;
