import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Content from 'components/Content';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

import { initialize, selectCountry, changeYear } from './actions';
import { isInitialized, selectSelectedCountry, selectYears } from './selectors';
import reducer from './reducer';
import saga from './saga';

class MapPage extends React.PureComponent { // eslint-disable-line
  componentWillMount() {
    this.props.init();
  }
  render() {
    const {
      initialized,
      selectedCountry,
      onCountrySelect,
      years,
      onChangeYear,
    } = this.props;
    return (
      <Content>
        <Sidebar />
        <Map
          initialized={initialized}
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
          years={years}
          changeYear={onChangeYear}
        />
      </Content>
    );
  }
}

MapPage.propTypes = {
  init: PropTypes.func,
  initialized: PropTypes.bool,
  selectedCountry: PropTypes.string,
  onCountrySelect: PropTypes.func,
  years: PropTypes.object,
  onChangeYear: PropTypes.func,
};

export function mapStateToProps(state) { // eslint-disable-line
  return {
    initialized: isInitialized(state),
    selectedCountry: selectSelectedCountry(state),
    years: selectYears(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(initialize()),
    onCountrySelect: (country) => dispatch(selectCountry(country)),
    onChangeYear: (year) => dispatch(changeYear(year)),
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

