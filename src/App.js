import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import MapPage from 'containers/MapPage';
import AboutPage from 'containers/AboutPage';
import Header from 'components/Header';


const MenuLink = styled(Link)`
  color: #95989A;
  text-decoration: none;
  align-self: center;
  margin-left: auto;
  margin-right: 25px;
`;

class App extends React.PureComponent { // eslint-disable-line
  render() {
    return (
      <div>
        <Header title="Refugee flow visualization">
          <MenuLink to="/about">About</MenuLink>
        </Header>
        <Switch>
          <Route exact path="/" component={MapPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}

export function mapStateToProps(state) { // eslint-disable-line
  return {};
}

export function mapDispatchToProps(dispatch) { // eslint-disable-line
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect
)(App);
