import { takeLatest, take, fork, call, put, select } from 'redux-saga/effects';
import slugify from 'slugify';
import * as R from 'ramda';
import api from 'utils/api';
import {
  initializeError,
  initializeSuccess,
  selectCountrySuccess,
  changeYearSuccess,
} from './actions';
import { INITIALIZE, SELECT_COUNTRY, CHANGE_YEAR, slugOptions } from './constants';
import { selectSelectedCountry, selectCurrentYear } from './selectors';

/**
 * Puts current country and year to correct place in state
 */
function* handleCountryData(currentCountry, y) {
  let currentYear = y;
  try {
    const storeCountry = yield select(selectSelectedCountry);
    const storeYear = yield select(selectCurrentYear);
    if (storeCountry === currentCountry && !!storeYear) {
      return;
    }
    const countryData = yield call(
      api,
      `countries/${slugify(currentCountry, slugOptions)}.json`
    );
    const years = R.keys(countryData);
    [currentYear] = !currentYear ? years : [currentYear];

    if (currentYear === years[0]) {
      years.some((year) => {
        const cursor = R.find(R.propSatisfies((c) =>
          c !== 'Various/Unknown', 'country'))(countryData[year]);
        if (cursor) {
          currentYear = year;
          return true;
        }
        return false;
      });
    }

    localStorage.setItem('reflow/currentCountry', currentCountry);
    localStorage.setItem('reflow/currentYear', currentYear);
    yield put(initializeSuccess({
      country: currentCountry,
      years: {
        min: years[0],
        max: years[years.length - 1],
        current: currentYear,
      },
      countryData,
    }));
  } catch (e) {
    yield put(initializeError(e));
  }
}


export function* initFlow() {
  // check country and year cookies and update if not found
  // put country and years {years: { min: 1951, max: 2016, current: 1998 }}
  let currentCountry = localStorage.getItem('reflow/currentCountry');
  const currentYear = localStorage.getItem('reflow/currentYear');

  currentCountry = !currentCountry ? 'Finland' : currentCountry;
  yield fork(handleCountryData, currentCountry, currentYear);
}

export function* countrySelectFlow() {
  while (true) {
    const req = yield take(SELECT_COUNTRY);
    const currentYear = localStorage.getItem('reflow/currentYear');

    yield fork(handleCountryData, req.country, currentYear);
    yield put(selectCountrySuccess(req.country));
  }
}

export function* yearChangeFlow() {
  while (true) {
    const req = yield take(CHANGE_YEAR);
    yield put(changeYearSuccess(req.year));
  }
}

export default function* defaultSaga() {
  yield takeLatest(INITIALIZE, initFlow);
  yield fork(countrySelectFlow);
  yield fork(yearChangeFlow);
}
