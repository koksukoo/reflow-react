import styled from 'styled-components';

const StyledSidebar = styled.aside`
  width: 20%;
  min-width:200px;
  background-color: #EBEBEB;
  box-shadow: 2px 5px 5px rgba(0,0,0,0.2);
  padding: 20px;
  overflow: auto;
  position: relative;

  @media only screen and (max-width: 992px) {
    width: 80%;
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100px;
    display: ${({ isRevealed }) => !isRevealed && 'none'};
  }
`;

export default StyledSidebar;
