import styled from 'styled-components';

const Country = styled.path`
  fill: ${({ isTarget, theme }) => isTarget ? theme.colors.primary : theme.colors.grayDark};
  stroke: #4DD888;
  stroke-width: 0.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: fill 0.3s ease-in-out;

  &:hover {
    fill: #4DD888;
    animation-name: ${({ isTarget }) => isTarget ? 'unset' : 'pulsing-fill'};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    cursor: pointer;
  }

  @keyframes pulsing-fill {
    0% {
      fill: ${({ theme }) => theme.colors.primary};
    }
    50% {
      fill: ${({ theme }) => theme.colors.primaryDark}
    }
    100% {
      fill: ${({ theme }) => theme.colors.primary}
    }
  }
`;

export default Country;
