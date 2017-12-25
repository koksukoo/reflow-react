import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaBurger from 'react-icons/lib/fa/bars';
import FaTimes from 'react-icons/lib/fa/times-circle';

const StyledButton = styled.button`
  display: none;
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.grayLight};
  font-size: 30px;
  padding: 0 30px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grayDarker};
  transition: background-color .2s ease;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  @media only screen and (max-width: 992px) {
    display: block;
  }
`;

function MobileMenuReveal({ revealMenu, isRevealed }) {
  return (
    <StyledButton onClick={revealMenu}>
      {isRevealed ? <FaTimes /> : <FaBurger />}
    </StyledButton>
  );
}

MobileMenuReveal.propTypes = {
  revealMenu: PropTypes.func,
  isRevealed: PropTypes.bool,
};

export default MobileMenuReveal;
