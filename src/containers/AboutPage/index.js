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
  overflow: auto;

  .contact {
    font-style: italic;
    margin-top: 50px;
    margin-left: 20px;
    padding-left: 10px;
    border-left: 5px solid ${({ theme }) => theme.colors.primary};
  }
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
  transition: background-color .2s ease-in-out;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 6px 12px 6px 8px;

  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

class AboutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { email: null };
  }

  componentDidMount() {
    if (!this.content) return;
    setTimeout(() => {
      this.setState({ email: 'm' });
      'ikkokokkoniemi@gmail.com'.split('').forEach((c, i) => {
        setTimeout(() => this.setState({
          email: this.state.email + c,
        }), 100 * (i + 1));
      });
    }, 1);
  }

  render() {
    return (
      <Content ref={(n) => { this.content = n; }}>
        <AboutContainer>
          <StyledAboutTitle>
            About
            <StyledBackLink to="/"><FaBack /> Go Back</StyledBackLink>
          </StyledAboutTitle>
          <p>
            This is a react fork of <a href="https://github.com/kajumito/reflow">&quot;reflow&quot;-github-project</a>.
          </p>
          <p>
            The Original authors of that project are Mikko Kokkoniemi, Kasper Tontti, Hentter Eloranta and Tapio Mylläri. This fork is written by Mikko kokkoniemi.
          </p>
          <p>
            The most important technologies and libraries used in this project are:
          </p>
          <ul>
            <li>React</li>
            <li>Redux-saga</li>
            <li>Styled-components</li>
            <li>Ramda</li>
            <li>D3</li>
          </ul>
          <p>
            The map data is retrieved from <a href="http://www.naturalearthdata.com/downloads/110m-cultural-vectors/">Natural Earth</a>, and refugee statistics are from <a href="http://popstats.unhcr.org/en/overview">UNHCR Population Statistics</a>.
          </p>

          <p>
            This software is licensed under <a href="https://tldrlegal.com/license/mit-license">MIT-license</a>.
          </p>

          <p>
            Feel free to throw me an email if you&apos;re interested in contributing (or have any other sort of interest in the project).
          </p>

          <p className="contact">
            Mikko Kokkoniemi, <br />
            {this.state.email}
          </p>
        </AboutContainer>
      </Content>
    );
  }
}

AboutPage.propTypes = {};

export default AboutPage;
