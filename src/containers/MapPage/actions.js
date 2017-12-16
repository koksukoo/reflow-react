import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
} from './constants';

// Init
export const initialize = () => ({ type: INITIALIZE });
export const initializeSuccess = (data) => ({ type: INITIALIZE_SUCCESS, data });
export const initializeError = (error) => ({ type: INITIALIZE_ERROR, error });
