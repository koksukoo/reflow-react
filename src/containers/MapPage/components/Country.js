import styled from 'styled-components';

const Country = styled.path`
  fill: ${({ target }) => target ? '#4DD888' : '#4E4D4D'};
  stroke: #4DD888;
  stroke-width: 0.5px;
  stroke-linecap: round;
  stroke-linejoin: round;

  &:hover {
    fill: #4DD888;
  }
`;

export default Country;
