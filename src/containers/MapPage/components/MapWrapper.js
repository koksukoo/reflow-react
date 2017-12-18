import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  opacity: ${({ loading }) => loading ? 0.3 : 1};
`;

export default MapWrapper;
