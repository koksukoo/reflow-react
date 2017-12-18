import { takeLatest, take, fork, call, put } from 'redux-saga/effects';
import slugify from 'slugify';
import * as R from 'ramda';
import api from 'utils/api';
import { initializeError, initializeSuccess, selectCountrySuccess } from './actions';
import { INITIALIZE, SELECT_COUNTRY, slugOptions } from './constants';

export function* initFlow() {
  // check country and year cookies and update if not found
  // put country and years {years: { min: 1951, max: 2016, current: 1998 }}
  let currentCountry = localStorage.getItem('reflow/currentCountry');
  let currentYear = localStorage.getItem('reflow/currentYear');

  currentCountry = !currentCountry ? 'Finland' : currentCountry;

  try {
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

export function* countrySelectFlow() {
  while (true) {
    const req = yield take(SELECT_COUNTRY);
    yield put(selectCountrySuccess(req.country));
  }
}

export default function* defaultSaga() {
  yield takeLatest(INITIALIZE, initFlow);
  yield fork(countrySelectFlow);
}
