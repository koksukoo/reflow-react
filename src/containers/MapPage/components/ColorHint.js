import React from 'react';
import styled from 'styled-components';
import { colorMap } from 'utils/constants';

const Wrapper = styled.div`
  height: 20px;
  width: 150px;
  position: relative;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  user-select: none;
`;

const Tone = styled.div`
  width: 1%;
  height: 20px;
  float: left;
  background-color: ${({ c }) => c};
`;

const Indicator = styled.span`
  position: absolute;
  left: ${({ left }) => left && '5px'};
  right: ${({ right }) => right && '5px'};
  color: ${({ right }) => right && '#fff'};
  font-size: 10px;
  line-height: 20px;
`;

function ColorHint() {
  return (
    <Wrapper>
      {colorMap.map((c) => <Tone key={c} c={c} />)}
      <Indicator left>1</Indicator>
      <Indicator right>&gt;1000</Indicator>
    </Wrapper>
  );
}

export default ColorHint;
