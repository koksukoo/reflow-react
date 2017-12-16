import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCountryTitle = styled.h2`
  display: inline-block;
  border-bottom: 4px solid #4DD888;
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
`;

function CountryTitle({ title, onSubmit }) {
  return (
    <StyledCountryTitle>
      <form onSubmit={onSubmit}>
        { title }
      </form>
    </StyledCountryTitle>
  );
}

CountryTitle.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default CountryTitle;
