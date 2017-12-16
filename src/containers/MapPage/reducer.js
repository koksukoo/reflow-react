/**
 * MapPage reducer
 */

import update from 'immutability-helper';

import {
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
} from './constants';

const initialState = {
  selectedCountry: null,
  years: null,
  loadingCountry: false,
  initialized: false,
  minYear: false,
};

export default function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return update(state, {
        loadingCountry: { $set: false },
        years: { $set: action.years },
        selectedCountry: { $set: action.country },
        initialized: { $set: true },
      });
    case INITIALIZE_ERROR:
      return update(state, {
        loadingCountry: { $set: false },
      });
    default:
      return state;
  }
}

