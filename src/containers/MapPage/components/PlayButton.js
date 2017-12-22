import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaPlay from 'react-icons/lib/fa/play-circle';
import FaPause from 'react-icons/lib/fa/pause-circle';


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
`;

function PlayButton({ togglePlaying, isPlaying }) {
  return (
    <Wrapper onClick={togglePlaying} isPlaying={isPlaying}>
      {isPlaying
        ? <FaPause />
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
