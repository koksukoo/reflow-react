import styled from 'styled-components';

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.grayLight};
  display: flex;
  height: ${window.innerHeight - 100}px;
`;

export default Content;
