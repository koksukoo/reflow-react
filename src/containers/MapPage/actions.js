import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  SELECT_COUNTRY,
  SELECT_COUNTRY_SUCCESS,
} from './constants';

// Init
export const initialize = () => ({ type: INITIALIZE });
export const initializeSuccess = (data) => ({ type: INITIALIZE_SUCCESS, data });
export const initializeError = (error) => ({ type: INITIALIZE_ERROR, error });

// select a country
export const selectCountry = (country) => ({ type: SELECT_COUNTRY, country });
export const selectCountrySuccess = (country) => ({ type: SELECT_COUNTRY_SUCCESS, country });
