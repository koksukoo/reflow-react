import styled from 'styled-components';

const CountryTooltip = styled.div.attrs({
  className: 'tooltip',
  style: ({ top, left }) => ({
    top, left,
  }),
})`
  position: absolute;
  text-align: center;
  background: #fff;
  border: 0;
  border-radius: 3px;
  padding: 3px 8px;
  pointer-events: none;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grayDark};
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
`;

export default CountryTooltip;

