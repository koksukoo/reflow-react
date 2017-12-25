import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom';
import FaInfo from 'react-icons/lib/fa/info-circle';
import MapPage from 'containers/MapPage';
import AboutPage from 'containers/AboutPage';
import Header from 'components/Header';


const MenuLink = styled(Link)`
  color: #95989A;
  text-decoration: none;
  align-self: center;
  margin-left: auto;
  margin-right: 25px;
  transition: color 0.2s ease-in-out;
  text-align: center;

  @media only screen and (max-width: 992px) {
    font-size: 30px;
  }

  &:hover {
    color: #666;
  }

  span {
    font-size: 12px;
    display: block;

    @media only screen and (max-width: 992px) {
      display: none;
    }
  }
`;

class App extends React.PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      sidebarRevealed: false,
    };
    this.toggleSidebarReveal = this.toggleSidebarReveal.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', (event) => {
      const domMapPage = findDOMNode(this.mapPage); // eslint-disable-line react/no-find-dom-node
      if (!domMapPage) return;
      if ([...domMapPage.childNodes[1].childNodes].includes(event.target)) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebarReveal() {
    this.setState({ sidebarRevealed: !this.state.sidebarRevealed });
  }

  closeSidebar() {
    this.setState({ sidebarRevealed: false });
  }

  render() {
    return (
      <div>
        <Header title="Refugee flow visualization" revealMenu={this.toggleSidebarReveal} isRevealed={this.state.sidebarRevealed}>
          <MenuLink to="/about" title="About"><FaInfo /><span>About</span></MenuLink>
        </Header>
        <Switch>
          <Route exact path="/" render={(props) => <MapPage {...props} isRevealed={this.state.sidebarRevealed} ref={(n) => { this.mapPage = n; }} />} />
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
