/**
 * MapPage reducer
 */

import update from 'immutability-helper';

import {
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  SELECT_COUNTRY_SUCCESS,
} from './constants';

const initialState = {
  selectedCountry: null,
  years: null,
  loadingCountry: false,
  initialized: false,
  minYear: false,
  countryTraffic: null,
};

export default function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return update(state, {
        loadingCountry: { $set: false },
        years: { $set: action.data.years },
        selectedCountry: { $set: action.data.country },
        countryData: { $set: action.data.countryData },
        initialized: { $set: true },
      });
    case INITIALIZE_ERROR:
      return update(state, {
        loadingCountry: { $set: false },
      });
    case SELECT_COUNTRY_SUCCESS:
      return update(state, {
        selectedCountry: { $set: action.country },
      });
    default:
      return state;
  }
}

