import styled from 'styled-components';

const MapWrapper = styled.div.attrs({ className: 'map-svg' })`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  opacity: ${({ loading }) => loading ? 0.3 : 1};

  .rc-slider-rail {
    background-color: #cacaca;
    height: 14px;
    border-radius: 7px;
    box-shadow: 1px 2px 5px 0px #a7a7a7;
  }

  .rc-slider-track {
    height: 14px;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .rc-slider-step {
    height: 14px;
  }

  .rc-slider-handle {
    width: 24px;
    height: 24px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export default MapWrapper;
