import React from 'react';
import PropTypes from 'prop-types';
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import * as R from 'ramda';
import { drawArcs } from 'utils/svg';
import world from 'data/world.json';
import { mapConfig } from '../constants';
import Country from './Country';
import MapWrapper from './MapWrapper';
import StyledMap from './StyledMap';
import SliderWrapper from './SliderWrapper';
import SliderHandle from './SliderHandle';
import YearOutput from './YearOutput';


const SelectedProjection = geoNaturalEarth1;

class Map extends React.PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = { svgWidth: null, svgHeight: null };
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

  render() {
    const {
      selectedCountry,
      initialized,
      onCountrySelect,
      years,
      changeYear,
      traffic,
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
                onClick={() => onCountrySelect(d.properties.NAME)}
              />))}
          </g>
          <g className="traffic" ref={(n) => { this.traffic = n; }} >
            {traffic && traffic.map((countryObj) => {
              const {
                country,
                countAsylum, // eslint-disable-line
                countRefugee, // eslint-disable-line
              } = countryObj;

              if (!country || country === 'Stateless') return null;

              const fromCountry = R.find(R.pathEq(['properties', 'NAME'], country))(geoData);
              const toCountry = R.find(R.pathEq(['properties', 'NAME'], selectedCountry))(geoData);
              if (!fromCountry) return null;
              const coordinates = [
                fromCountry.centroid,
                toCountry.centroid,
              ];
              return (
                <path
                  key={`${Date.now() + coordinates[0][0]}`}
                  d={drawArcs(coordinates)}
                  className="arc"
                />
              );
            })}
          </g>
        </StyledMap>
        {!!initialized &&
        <SliderWrapper>
          <Slider
            min={+years.min}
            max={+years.max}
            marks={sliderMarks}
            defaultValue={+years.current}
            handle={SliderHandle}
            onChange={changeYear}
          />
          <YearOutput>{years.current}</YearOutput>
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
};

export default Map;
