/**
 * MapPage reducer
 */

import update from 'immutability-helper';

import {
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  SELECT_COUNTRY_SUCCESS,
  CHANGE_YEAR_SUCCESS,
} from './constants';

const initialState = {
  selectedCountry: null,
  years: null,
  initialized: false,
  countryData: null,
  countryMax: null,
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
      });
    case INITIALIZE_ERROR:
      return update(state, {
        initialized: { $set: false },
      });
    case SELECT_COUNTRY_SUCCESS:
      return update(state, {
        selectedCountry: { $set: action.country },
      });
    case CHANGE_YEAR_SUCCESS:
      return update(state, {
        years: {
          current: { $set: action.year },
        },
      });
    default:
      return state;
  }
}

