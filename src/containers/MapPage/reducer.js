/**
 * MapPage reducer
 */

import update from 'immutability-helper';

import {
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  SELECT_COUNTRY_SUCCESS,
  CHANGE_YEAR_SUCCESS,
  SET_TARGET_COUNTRY_DATA,
  SET_HOVERED_COUNTRY,
} from './constants';

const initialState = {
  selectedCountry: null,
  selectedCountryCode: null,
  hoveredCountry: {},
  years: null,
  initialized: false,
  countryData: null,
  countryMax: null,
  targetCountryDetails: {
    gdp: null,
    gdpCapita: null,
    le: null,
    population: null,
  },
};

export default function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return update(state, {
        years: { $set: action.data.years },
        selectedCountry: { $set: action.data.country },
        countryData: { $set: action.data.countryData },
        initialized: { $set: true },
        countryMax: { $set: action.data.countryMax },
        selectedCountryCode: { $set: action.data.countryCode },
      });
    case INITIALIZE_ERROR:
      return update(state, {
        initialized: { $set: false },
      });
    case SELECT_COUNTRY_SUCCESS:
      return update(state, {
        selectedCountry: { $set: action.country },
        selectedCountryCode: { $set: action.countryCode },
      });
    case CHANGE_YEAR_SUCCESS:
      return update(state, {
        years: {
          current: { $set: action.year },
        },
      });
    case SET_TARGET_COUNTRY_DATA:
      return update(state, {
        targetCountryDetails: { $set: action.data },
      });
    case SET_HOVERED_COUNTRY:
      return update(state, {
        hoveredCountry: {
          name: { $set: action.country },
          amount: { $set: action.sum },
        },
      });
    default:
      return state;
  }
}

