import { geoNaturalEarth1, geoPath } from 'd3-geo';

/**
 * MAP CONFIGS
 */
export const mapConfig = {
  width: 1200,
  height: 600,
  scalars: {
    scale: 5.333,
    width: 2.25,
    height: 1.75,
  },
};

export const mapProjection = geoNaturalEarth1()
  .scale(mapConfig.width / mapConfig.scalars.scale)
  .translate([
    mapConfig.width / mapConfig.scalars.width,
    mapConfig.height / mapConfig.scalars.height,
  ]);

export const mapPath = geoPath().pointRadius(2).projection(mapProjection);


/**
 * INITIALIZE
 */
export const INITIALIZE = 'reflow/MapPage/INITIALIZE';
export const INITIALIZE_SUCCESS = 'reflow/MapPage/INITIALIZE_SUCCESS';
export const INITIALIZE_ERROR = 'reflow/MapPage/INITIALIZE_ERROR';
