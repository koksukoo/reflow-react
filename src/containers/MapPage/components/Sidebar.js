import React from 'react';
import PropTypes from 'prop-types';
import CountryTitle from './CountryTitle';
import StyledSidebar from './StyledSidebar';
import InfoList from './InfoList';
import AdditionalCountries from './AdditionalCountries';

class Sidebar extends React.PureComponent {
  render() {
    const {
      country,
      data,
      filteredList,
      onCountrySelect,
      additionalCountries,
      totalRefugees,
      isRevealed,
    } = this.props;

    return (
      <StyledSidebar innerRef={(n) => { this.root = n; }} isRevealed={isRevealed}>
        <CountryTitle
          title={country}
          filteredList={filteredList}
          onCountrySelect={onCountrySelect}
        />
        <InfoList data={{ ...data, totalRefugees }} />
        <AdditionalCountries data={additionalCountries} />
      </StyledSidebar>
    );
  }
}

Sidebar.propTypes = {
  country: PropTypes.string,
  data: PropTypes.object,
  filteredList: PropTypes.array,
  onCountrySelect: PropTypes.func,
  additionalCountries: PropTypes.array,
  totalRefugees: PropTypes.number,
  isRevealed: PropTypes.bool,
};

export default Sidebar;
