import React from 'react';
import PropTypes from 'prop-types';
import CountryTitle from './CountryTitle';
import StyledSidebar from './StyledSidebar';
import InfoList from './InfoList';

function Sidebar({
  country,
  data,
  filteredList,
  onCountrySelect,
}) {
  return (
    <StyledSidebar>
      <CountryTitle
        title={country}
        onSubmit={() => console.log('Country changed')} // eslint-disable-line
        filteredList={filteredList}
        onCountrySelect={onCountrySelect}
      />
      <InfoList data={data} />
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  country: PropTypes.string,
  data: PropTypes.object,
  filteredList: PropTypes.array,
  onCountrySelect: PropTypes.func,
};

export default Sidebar;
