import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  SELECT_COUNTRY,
  SELECT_COUNTRY_SUCCESS,
  CHANGE_YEAR,
  CHANGE_YEAR_SUCCESS,
  CHANGE_YEAR_ERROR,
  SET_TARGET_COUNTRY_DATA,
  SET_TARGET_COUNTRY_DATA_ERROR,
  COUNTRY_HOVERED,
  SET_HOVERED_COUNTRY,
  SET_HOVERED_COUNTRY_ERROR,
  SET_NEXT_YEAR,
  SET_SEARCH_BAR_COUNTRY,
} from './constants';

// Init
export const initialize = () => ({ type: INITIALIZE });
export const initializeSuccess = (data) => ({ type: INITIALIZE_SUCCESS, data });
export const initializeError = (error) => ({ type: INITIALIZE_ERROR, error });

// select a country
export const selectCountry = (country, countryCode) => ({ type: SELECT_COUNTRY, country, countryCode });
export const selectCountrySuccess = (country, countryCode) => ({ type: SELECT_COUNTRY_SUCCESS, country, countryCode });
export const setSearchbarCountry = (country) => ({ type: SET_SEARCH_BAR_COUNTRY, country });

// target counry data
export const setTargetCountryData = (data) => ({ type: SET_TARGET_COUNTRY_DATA, data });
export const setTargetCountryDataError = (error) => ({ type: SET_TARGET_COUNTRY_DATA_ERROR, error });

// change year
export const changeYear = (year) => ({ type: CHANGE_YEAR, year });
export const changeYearSuccess = (year) => ({ type: CHANGE_YEAR_SUCCESS, year });
export const changeYearError = (error) => ({ type: CHANGE_YEAR_ERROR, error });

// hovered country
export const countryHovered = (country) => ({ type: COUNTRY_HOVERED, country });
export const setHoveredCountry = (country, sum = 0) => ({ type: SET_HOVERED_COUNTRY, country, sum });
export const setHoveredCountryError = (error) => ({ type: SET_HOVERED_COUNTRY_ERROR, error });

export const setNextYear = () => ({ type: SET_NEXT_YEAR });
