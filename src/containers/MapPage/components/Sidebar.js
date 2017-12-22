import React from 'react';
import PropTypes from 'prop-types';
import CountryTitle from './CountryTitle';
import StyledSidebar from './StyledSidebar';
import InfoList from './InfoList';

function Sidebar({ country, data }) {
  return (
    <StyledSidebar>
      <CountryTitle
        title={country}
        onSubmit={() => console.log('Country changed')} // eslint-disable-line
      />
      <InfoList data={data} />
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  country: PropTypes.string,
  data: PropTypes.object,
};

export default Sidebar;
