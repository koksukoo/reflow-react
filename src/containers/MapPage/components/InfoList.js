import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseValue, scaleToMillions } from 'utils/data';

const StyledInfoList = styled.ul`
  list-style: none;
  margin-top: 20px;
  font-size: 15px;
  padding: 0;

  li {
    padding: 10px 0;
    color: #666;
  }

  li span {
    display: inline-block;
    float: right;
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: 18px;
  }
`;

function InfoList({ data }) {
  return (
    <StyledInfoList>
      <li>Population: <span>{ scaleToMillions(data.population) }</span></li>
      <li>GDP: <span>${ scaleToMillions(parseValue(data.gdp)) }</span></li>
      <li>GDP per Capita: <span>${ parseValue(data.gdpCapita, { round: true }) }</span></li>
      <li>Life expentancy: <span>{ data.le ? parseValue(data.le, { decimals: 2 }) : 'unknown' } y.</span></li>
      <li>Refugees (total): <span>{ data.totalRefugees }</span></li>
    </StyledInfoList>
  );
}

InfoList.propTypes = {
  data: PropTypes.object,
};

export default InfoList;
