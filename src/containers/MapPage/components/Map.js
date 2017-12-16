import React from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'data/world.json';
import { mapConfig } from '../constants';
import Country from './Country';
import MapWrapper from './MapWrapper';
import StyledMap from './StyledMap';

class Map extends React.PureComponent { // eslint-disable-line

  projection() {
    return geoNaturalEarth1()
      .scale(mapConfig.width / mapConfig.scalars.scale)
      .translate([
        mapConfig.width / mapConfig.scalars.width,
        mapConfig.height / mapConfig.scalars.height,
      ]);
  }

  render() {
    const geoData = feature(world, world.objects.ne_110m_admin_0_countries)
      .features;
    return (
      <MapWrapper>
        <StyledMap width={mapConfig.width} height={mapConfig.height}>
          <g className="countries">
            {geoData.map((d) =>
              (<Country
                key={`path-${d.properties.ADM0_A3}`}
                d={geoPath().projection(this.projection())(d)}
                className="country"
              />))}
          </g>
        </StyledMap>
      </MapWrapper>
    );
  }
}

Map.propTypes = {};

export default Map;
