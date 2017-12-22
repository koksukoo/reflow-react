import { createSelector } from 'reselect';
import { get } from 'utils/lens';

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