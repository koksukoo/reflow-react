import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Content from 'components/Content';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

import { initialize } from './actions';
import reducer from './reducer';
import saga from './saga';

class MapPage extends React.PureComponent { // eslint-disable-line
  componentWillMount() {
    this.props.init();
  }
  render() {
    return (
      <Content>
        <Sidebar />
        <Map />
      </Content>
    );
  }
}

MapPage.propTypes = {
  init: PropTypes.func,
};

export function mapStateToProps(state) { // eslint-disable-line
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(initialize()),
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

