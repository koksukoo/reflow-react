import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaPlay from 'react-icons/lib/fa/play-circle';
import FaPause from 'react-icons/lib/fa/pause-circle';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';


const Wrapper = styled.div`
  width: 75px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: ${({ theme, isPlaying }) => isPlaying ? theme.colors.primary : theme.colors.gray};
  margin-right: 10px;
  transition: color .2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &:hover path {
    stroke: ${({ theme }) => theme.colors.grayLighter};
    stroke-width: 2;
  }

  .spinner {
    position: absolute;
    font-size: 44px;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

function PlayButton({ togglePlaying, isPlaying }) {
  return (
    <Wrapper onClick={togglePlaying} isPlaying={isPlaying}>
      {isPlaying
        ? [<FaCircleONotch className="spinner" key="1" />, <FaPause key="2" />]
        : <FaPlay />
      }
    </Wrapper>
  );
}

PlayButton.propTypes = {
  togglePlaying: PropTypes.func,
  isPlaying: PropTypes.bool,
};

export default PlayButton;
