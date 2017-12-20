import React from 'react';
import PropTypes from 'prop-types';
import CountryTitle from './CountryTitle';
import StyledSidebar from './StyledSidebar';
import InfoList from './InfoList';


const dummyListInfo = [
  {
    title: 'Population',
    value: '5,4 mil.',
  },
  {
    title: 'GDP',
    value: '235,8 mil.',
  },
  {
    title: 'GDP (Capita)',
    value: '43,1k mil.',
  },
  {
    title: 'Life expentancy',
    value: '81.4',
  },
];

function Sidebar({ country }) {
  return (
    <StyledSidebar>
      <CountryTitle
        title={country}
        onSubmit={() => console.log('Country changed')} // eslint-disable-line
      />
      <InfoList data={dummyListInfo} />
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  country: PropTypes.string,
};

export default Sidebar;
