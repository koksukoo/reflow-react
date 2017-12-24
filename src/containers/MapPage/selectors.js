import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import * as R from 'ramda';
import { get } from 'utils/lens';
import { countryNames } from 'utils/constants';

const selectMapDomain = (state) => state.map;

export const isInitialized = createSelector(
  selectMapDomain,
  get('initialized'),
);

export const selectSelectedCountry = createSelector(
  selectMapDomain,
  get('selectedCountry'),
);

export const selectSelectedCountryCode = createSelector(
  selectMapDomain,
  get('selectedCountryCode'),
);

export const selectCurrentYear = createSelector(
  selectMapDomain,
  get('years.current'),
);

export const selectYears = createSelector(
  selectMapDomain,
  get('years'),
);

export const selectTraffic = createSelector(
  selectMapDomain,
  get('countryData'),
);

export const selectCurrentTraffic = createSelector(
  selectMapDomain,
  (mapDomain) => {
    const currentYear = get('years.current', mapDomain);
    return currentYear ? mapDomain.countryData[currentYear] : [];
  }
);

export const selectAdditionalCountries = createSelector(
  (state) => state,
  (state) => {
    let additionalCountries = selectCurrentTraffic(state);
    additionalCountries = R.filter((obj) => !countryNames.includes(obj.country), additionalCountries);
    return additionalCountries;
  }
);

export const selectCountryMax = createSelector(
  selectMapDomain,
  get('countryMax'),
);

export const selectCurrentCountryDetails = createSelector(
  selectMapDomain,
  (mapDomain) => {
    const currentYear = get('years.current', mapDomain);
    const getCurretYearData = (selector) =>
      currentYear ? get(`targetCountryDetails.${selector}.${currentYear}`, mapDomain) : null;

    return ({
      gdp: getCurretYearData('gdp'),
      gdpCapita: getCurretYearData('gdpCapita'),
      le: getCurretYearData('le'),
      population: getCurretYearData('population'),
    });
  },
);

export const selectHoveredCountry = createSelector(
  selectMapDomain,
  get('hoveredCountry'),
);

const searchFormSelector = formValueSelector('search');

export const selectFilteredList = (state) => {
  const searchValue = searchFormSelector(state, 'country');
  const filteredResults = R.filter((n) => !n.search(new RegExp(searchValue, 'ig')), countryNames);
  return filteredResults;
};

export const selectTotalRefugees = (state) => {
  const currentTraffic = selectCurrentTraffic(state);
  const getCount = (obj) => +(obj.countAsylum || 0) + +(obj.countRefugee || 0);
  return R.sum(R.map(getCount, currentTraffic));
};
