import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContent = styled.div.attrs({
  style: ({ height }) => ({
    height,
  }),
})`
  background-color: ${({ theme }) => theme.colors.grayLight};
  display: flex;
`;

class Content extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight - 100,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ height: window.innerHeight - 100 });
    });
  }

  render() {
    const { children } = this.props;
    return (
      <StyledContent innerRef={(n) => { this.node = n; }} height={this.state.height}>
        {children}
      </StyledContent>
    );
  }
}

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
