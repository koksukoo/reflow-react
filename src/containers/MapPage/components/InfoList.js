import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
      {data.map(({ title, value }) => <li key={title}>{ title }: { value }</li>)}
    </StyledInfoList>
  );
}

InfoList.propTypes = {
  data: PropTypes.array,
};

export default InfoList;
