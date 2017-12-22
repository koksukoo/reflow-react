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
 * SlugConfig
 */
export const slugOptions = { lower: true, remove: /[$*_+~.,()'"!\-:@]/g };

/**
 * INITIALIZE
 */
export const INITIALIZE = 'reflow/MapPage/INITIALIZE';
export const INITIALIZE_SUCCESS = 'reflow/MapPage/INITIALIZE_SUCCESS';
export const INITIALIZE_ERROR = 'reflow/MapPage/INITIALIZE_ERROR';

/**
 * SELECT COUNTRY
 */
export const SELECT_COUNTRY = 'reflow/MapPage/SELECT_COUNTRY';
export const SELECT_COUNTRY_SUCCESS = 'reflow/MapPage/SELECT_COUNTRY_SUCCESS';
export const SELECT_COUNTRY_ERROR = 'reflow/MapPage/SELECT_COUNTRY_ERROR';

/**
 * TARGET COUNTRY DATA
 */
export const SET_TARGET_COUNTRY_DATA = 'reflow/MapPage/SET_TARGET_COUNTRY_DATA';
export const SET_TARGET_COUNTRY_DATA_ERROR = 'reflow/MapPage/SET_TARGET_COUNTRY_DATA_ERROR';

/**
 * CHANGE YEAR
 */
export const CHANGE_YEAR = 'reflow/MapPage/CHANGE_YEAR';
export const CHANGE_YEAR_SUCCESS = 'reflow/MapPage/CHANGE_YEAR_SUCCESS';
export const CHANGE_YEAR_ERROR = 'reflow/MapPage/CHANGE_YEAR_ERROR';

export const SET_NEXT_YEAR = 'reflow/MapPage/SET_NEXT_YEAR';

/**
 * HOVERED COUNTRY
 */
export const COUNTRY_HOVERED = 'reflow/MapPage/COUNTRY_HOVERED';
export const SET_HOVERED_COUNTRY = 'reflow/MapPage/SET_HOVERED_COUNTRY';
export const SET_HOVERED_COUNTRY_ERROR = 'reflow/MapPage/SET_HOVERED_COUNTRY_ERROR';
