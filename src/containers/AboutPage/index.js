import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FaBack from 'react-icons/lib/fa/long-arrow-left';
import Content from 'components/Content';

const AboutContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px 30px;
  background-color: #fff;

`;

const StyledAboutTitle = styled.h1`
  display: inline-block;
  border-bottom: 4px solid #4DD888;
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 30px;
  width: 100%;
`;

const StyledBackLink = styled(Link)`
  font-size: 14px;
  margin-bottom: 5px;
  float: right;
  color: ${({ theme }) => theme.colors.grayDark};
  text-decoration: none;
  transition: background-color, color .2s ease-in-out;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 6px 12px 6px 8px;

  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

function AboutPage() {
  return (
    <Content>
      <AboutContainer>
        <StyledAboutTitle>
          About
          <StyledBackLink to="/"><FaBack /> Go Back</StyledBackLink>
        </StyledAboutTitle>
        <p>
          This is a react fork of <a href="https://github.com/kajumito/reflow">this github-project</a>.
        </p>
        <p>
          Original authors of that project are Mikko Kokkoniemi, Kasper Tontti, Hentter Eloranta and Tapio Mylläri. This fork is written by Mikko kokkoniemi.
        </p>
        <p>
          The most important technologies / libraries used in this project are:
        </p>
        <ul>
          <li>React</li>
          <li>Redux-saga</li>
          <li>Styled-components</li>
          <li>Ramda</li>
        </ul>
      </AboutContainer>
    </Content>
  );
}

AboutPage.propTypes = {};

export default AboutPage;
