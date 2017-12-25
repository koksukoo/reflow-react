import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Content from 'components/Content';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import CountryTooltip from './components/CountryTooltip';

import {
  initialize,
  selectCountry,
  changeYear,
  countryHovered,
} from './actions';
import {
  isInitialized,
  selectSelectedCountry,
  selectYears,
  selectCurrentTraffic,
  selectCountryMax,
  selectCurrentCountryDetails,
  selectHoveredCountry,
  selectFilteredList,
  selectAdditionalCountries,
  selectTotalRefugees,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

class MapPage extends React.PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      tooltipTop: 0,
      tooltipLeft: 0,
    };

    this.setTooltipPosition = this.setTooltipPosition.bind(this);
  }

  componentDidMount() {
    this.props.init();
  }

  setTooltipPosition(top, left) {
    this.setState({
      tooltipTop: top,
      tooltipLeft: left,
    });
  }

  render() {
    const {
      dispatch,
      initialized,
      selectedCountry,
      onCountrySelect,
      years,
      onChangeYear,
      traffic,
      countryMax,
      currentCountryDetails,
      hoveredCountry,
      onCountryHovered,
      filteredList,
      additionalCountries,
      totalRefugees,
      isRevealed,
    } = this.props;

    return (
      <Content>
        <Sidebar
          country={selectedCountry}
          data={currentCountryDetails}
          filteredList={filteredList}
          onCountrySelect={onCountrySelect}
          additionalCountries={additionalCountries}
          totalRefugees={totalRefugees}
          isRevealed={isRevealed}
        />
        <Map
          dispatch={dispatch}
          initialized={initialized}
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
          years={years}
          changeYear={onChangeYear}
          traffic={traffic}
          countryMax={countryMax}
          onCountryHovered={onCountryHovered}
          onSetTooltipPosition={this.setTooltipPosition}
        />
        {!!hoveredCountry && !!hoveredCountry.name &&
          <CountryTooltip top={this.state.tooltipTop} left={this.state.tooltipLeft}>
            {hoveredCountry.name} ({hoveredCountry.amount})
          </CountryTooltip>
        }
      </Content>
    );
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func,
  init: PropTypes.func,
  initialized: PropTypes.bool,
  selectedCountry: PropTypes.string,
  onCountrySelect: PropTypes.func,
  years: PropTypes.object,
  onChangeYear: PropTypes.func,
  traffic: PropTypes.array,
  countryMax: PropTypes.number,
  currentCountryDetails: PropTypes.object,
  hoveredCountry: PropTypes.object,
  onCountryHovered: PropTypes.func,
  filteredList: PropTypes.array,
  additionalCountries: PropTypes.array,
  totalRefugees: PropTypes.number,
  isRevealed: PropTypes.bool,
};

export function mapStateToProps(state) { // eslint-disable-line
  return {
    initialized: isInitialized(state),
    selectedCountry: selectSelectedCountry(state),
    years: selectYears(state),
    traffic: selectCurrentTraffic(state),
    countryMax: selectCountryMax(state),
    currentCountryDetails: selectCurrentCountryDetails(state),
    hoveredCountry: selectHoveredCountry(state),
    filteredList: selectFilteredList(state),
    additionalCountries: selectAdditionalCountries(state),
    totalRefugees: selectTotalRefugees(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    init: () => dispatch(initialize()),
    onCountrySelect: (country, countryCode) => dispatch(selectCountry(country, countryCode)),
    onChangeYear: (year) => dispatch(changeYear(year)),
    onCountryHovered: (country) => dispatch(countryHovered(country)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'map', reducer });
const withSaga = injectSaga({ key: 'map', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(MapPage);

