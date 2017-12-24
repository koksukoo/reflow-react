import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    font-size: 12px;
    padding: 5px;

    &:nth-child(1) {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.grayDark};
    }
    &:nth-child(even) {
      background-color: #dadada;
    }
  }

  li span {
    display: inline-block;
    float: right;
  }
`;

function AdditionalCountries({ data }) {
  return (
    <StyledList>
      {!!data.length && <li>Refugees and asylum seekers from countries not visible on the map:</li>}
      {data.map(({ country, countAsylum, countRefugee }) =>
        <li key={country}>{country} <span>{(+(countAsylum) || 0) + (+(countRefugee) || 0)}</span></li>)}
    </StyledList>
  );
}

AdditionalCountries.propTypes = {
  data: PropTypes.array,
};

export default AdditionalCountries;

