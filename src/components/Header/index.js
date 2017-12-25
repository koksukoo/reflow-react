import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledHeader from './StyledHeader';
import MobileMenuReveal from './MobileMenuReveal';


const H1 = styled.h1`
  color: #333;
  align-self: center;
  margin-left: 25px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

function Header({
  title,
  children,
  revealMenu,
  isRevealed,
}) {
  return (
    <StyledHeader>
      <MobileMenuReveal revealMenu={revealMenu} isRevealed={isRevealed} />
      <H1><Link to="/">{ title }</Link></H1>
      { children }
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  children: PropTypes.node,
  revealMenu: PropTypes.func,
  isRevealed: PropTypes.bool,
};

export default Header;
