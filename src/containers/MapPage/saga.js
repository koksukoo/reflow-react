import { takeLatest, take, fork, call, put, select } from 'redux-saga/effects';
import slugify from 'slugify';
import * as R from 'ramda';
import api from 'utils/api';
import {
  initializeError,
  initializeSuccess,
  selectCountrySuccess,
  changeYearSuccess,
  setTargetCountryData,
  setTargetCountryDataError,
  setHoveredCountry,
  setHoveredCountryError,
} from './actions';
import {
  INITIALIZE,
  SELECT_COUNTRY,
  CHANGE_YEAR,
  COUNTRY_HOVERED,
  slugOptions,
  SET_NEXT_YEAR,
} from './constants';
import {
  selectSelectedCountry,
  selectSelectedCountryCode,
  selectCurrentYear,
  selectYears,
  selectCurrentTraffic,
} from './selectors';

/**
 * Sets target country info like gdp and life expentancy
 */
function* targetCountryDataFlow() {
  const targetCountryCode = yield select(selectSelectedCountryCode);
  if (!targetCountryCode) return;

  try {
    const pickCurrentCountryData = R.find(R.propEq('Country Code', targetCountryCode));

    const populationData = yield call(api, 'misc/population-data.json');
    const countryPopulation = pickCurrentCountryData(populationData);

    const gdpData = yield call(api, 'misc/gdp-data.json');
    const countryGdp = pickCurrentCountryData(gdpData);

    const gdpCapitaData = yield call(api, 'misc/gdp-capita.json');
    const countryGdpCapita = pickCurrentCountryData(gdpCapitaData);

    const leData = yield call(api, 'misc/le-data.json');
    const countryLeData = pickCurrentCountryData(leData);

    yield put(setTargetCountryData({
      population: countryPopulation,
      gdp: countryGdp,
      gdpCapita: countryGdpCapita,
      le: countryLeData,
    }));
  } catch (e) {
    setTargetCountryDataError(e);
  }
}

/**
 * Puts current country and year to correct place in state
 */
function* handleCountryData(currentCountry, y, code) {
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

    // Get all-time maximum count of selected country
    let maxCount = 0;
    R.keys(countryData).forEach((year) => {
      const getCount = (obj) => obj.country !== 'Various/Unknown'
        ? (+obj.countAsylum || 0) + (+obj.countRefugee || 0)
        : 0;
      const currentMax = R.reduce(R.max, -Infinity)(R.map(getCount, countryData[year]));
      maxCount = currentMax > maxCount ? currentMax : maxCount;
    });

    localStorage.setItem('reflow/currentCountry', currentCountry);
    localStorage.setItem('reflow/currentYear', currentYear);
    localStorage.setItem('reflow/currentCountryCode', code);

    yield put(initializeSuccess({
      country: currentCountry,
      countryCode: code,
      years: {
        min: years[0],
        max: years[years.length - 1],
        current: currentYear,
      },
      countryMax: maxCount,
      countryData,
    }));

    yield fork(targetCountryDataFlow);
  } catch (e) {
    yield put(initializeError(e));
  }
}


export function* initFlow() {
  // check country and year cookies and update if not found
  // put country and years {years: { min: 1951, max: 2016, current: 1998 }}
  let currentCountry = localStorage.getItem('reflow/currentCountry');
  let currentCountryCode = localStorage.getItem('reflow/currentCountryCode');
  const currentYear = localStorage.getItem('reflow/currentYear');

  currentCountry = !currentCountry ? 'Finland' : currentCountry;
  currentCountryCode = !currentCountryCode ? 'FIN' : currentCountryCode;
  yield fork(handleCountryData, currentCountry, currentYear, currentCountryCode);
}

export function* countrySelectFlow() {
  while (true) {
    const req = yield take(SELECT_COUNTRY);
    const currentYear = localStorage.getItem('reflow/currentYear');

    yield fork(handleCountryData, req.country, currentYear, req.countryCode);
    yield put(selectCountrySuccess(req.country, req.countryCode));
  }
}

export function* yearChangeFlow() {
  while (true) {
    const req = yield take(CHANGE_YEAR);
    localStorage.setItem('reflow/currentYear', req.year);
    yield put(changeYearSuccess(req.year));
  }
}

export function* setNextYearFlow() {
  while (true) {
    yield take(SET_NEXT_YEAR);
    const years = yield select(selectYears);

    if (years && (+(years.max) >= (+(years.current) + 1))) {
      yield put(changeYearSuccess(+(years.current) + 1));
    }
  }
}

export function* countryHoveredFlow() {
  while (true) {
    const req = yield take(COUNTRY_HOVERED);

    if (req.country === null) {
      yield put(setHoveredCountry(null));
    }

    try {
      const currentTraffic = yield select(selectCurrentTraffic);
      const hoveredObject = R.find(R.propEq('country', req.country))(currentTraffic);
      const sum = hoveredObject
        ? (+hoveredObject.countAsylum || 0) + (+hoveredObject.countRefugee || 0)
        : 0;

      yield put(setHoveredCountry(req.country, sum));
    } catch (e) {
      yield put(setHoveredCountryError(e));
    }
  }
}

export default function* defaultSaga() {
  yield takeLatest(INITIALIZE, initFlow);
  yield fork(countrySelectFlow);
  yield fork(yearChangeFlow);
  yield fork(setNextYearFlow);
  yield fork(countryHoveredFlow);
}
