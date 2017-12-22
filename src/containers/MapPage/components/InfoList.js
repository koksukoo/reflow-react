import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseValue, scaleToMillions } from 'utils/data';

const StyledInfoList = styled.ul`
  list-style: none;
  margin-top: 20px;
  font-size: 18px;
  padding: 0;

  li {
    padding: 10px 0;
    color: #666;
  }
`;

function InfoList({ data }) {
  return (
    <StyledInfoList>
      <li>Population: { scaleToMillions(data.population) }</li>
      <li>GDP: ${ scaleToMillions(parseValue(data.gdp)) }</li>
      <li>GDP per Capita: ${ parseValue(data.gdpCapita, { round: true }) }</li>
      <li>Life expentancy: { data.le ? parseValue(data.le, { decimals: 2 }) : 'unknown' } years</li>
    </StyledInfoList>
  );
}

InfoList.propTypes = {
  data: PropTypes.object,
};

export default InfoList;
