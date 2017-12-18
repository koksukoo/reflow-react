import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Content from 'components/Content';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

import { initialize, selectCountry } from './actions';
import { isInitialized, selectSelectedCountry } from './selectors';
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
    } = this.props;
    return (
      <Content>
        <Sidebar />
        <Map
          initialized={initialized}
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
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
};

export function mapStateToProps(state) { // eslint-disable-line
  return {
    initialized: isInitialized(state),
    selectedCountry: selectSelectedCountry(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(initialize()),
    onCountrySelect: (country) => dispatch(selectCountry(country)),
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

