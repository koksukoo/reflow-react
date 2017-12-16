import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import update from 'immutability-helper';


// Initial routing state
const routeInitialState = {
  location: {},
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return update(state, {
        location: { $merge: action.payload },
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    ...injectedReducers,
  });
}
