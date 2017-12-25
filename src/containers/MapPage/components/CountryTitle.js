import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';


const StyledForm = styled.form`
  input {
    background-color: transparent;
    border: 0;
    border-bottom: 4px solid #4DD888;
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
    outline: 0;
    text-indent: 5px;
    transition: background-color .2s ease;
    padding: 0;

    &:hover,
    &:focus {
      background-color: #fff;
    }
  }
`;

const FilteredList = styled.ul`
  list-style: none;
  padding: 5px 0 0;
  background-color: #fff;
  margin-top: 0;
  user-select: none;

  button {
    cursor: pointer;
    padding: 10px 5px;
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 12px;
    outline: 0;
  }

  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  li.active {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  li.info {
    padding: 5px;
    font-size: 12px;
    user-select: none;
    color: ${({ theme }) => theme.colors.gray};

    &:hover {
      background-color: transparent;
    }
  }
`;


let SearchForm = ({ handleSubmit, toggleList, selectCountry }) => (
  <StyledForm onSubmit={handleSubmit}>
    <Field
      className="searchInput"
      id="country"
      name="country"
      component="input"
      type="text"
      onFocus={(event) => { toggleList(true); event.target.select(); }}
      autoComplete="off"
      onKeyDown={selectCountry}
    />
  </StyledForm>
);
SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
  toggleList: PropTypes.func,
  selectCountry: PropTypes.func,
};
SearchForm = reduxForm({ form: 'search', withRef: true })(SearchForm);
SearchForm = connect((state) => ({
  initialValues: {
    country: state.map.selectedCountry,
  },
}), {})(SearchForm);


class CountryTitle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { listOpen: false, candidate: -1 };
    this.toggleList = this.toggleList.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', (event) => {
      if (!this.searchform) return;
      if (![...findDOMNode(this.searchform).childNodes].includes(event.target)) { // eslint-disable-line
        this.setState({ listOpen: false });
      }
    });
  }

  toggleList(forceTrue) {
    this.setState({ listOpen: forceTrue ? true : !this.state.listOpen });
  }

  render() {
    const {
      title,
      filteredList,
      onCountrySelect,
    } = this.props;

    const selectCountry = (event) => {
      const [up, down, enter] = [38, 40, 13];

      switch (event.keyCode) {
        case up:
          this.setState({
            candidate: this.state.candidate >= 0
              ? this.state.candidate - 1
              : -1,
          });
          break;
        case down:
          this.setState({
            candidate: this.state.candidate <= 5
              && this.state.candidate < filteredList.length
              ? this.state.candidate + 1
              : this.state.candidate,
          });
          break;
        case enter:
          event.preventDefault();
          if (filteredList[this.state.candidate]) {
            onCountrySelect(filteredList[this.state.candidate]);
            this.setState({
              listOpen: false,
            });
            // a tick to let focus trigger on selected country before blur
            setTimeout(() => {
              [...findDOMNode(this.searchform).childNodes][0].blur(); // eslint-disable-line
            }, 1);
          }
          break;
        default:
          this.setState({
            candidate: -1,
          });
          break;
      }
    };

    return (
      <div>
        {!!title &&
        <SearchForm
          toggleList={this.toggleList}
          ref={(n) => { this.searchform = n; }}
          selectCountry={selectCountry}
        />
        }
        {this.state.listOpen &&
        <FilteredList>
          {filteredList.length > 5 && <li className="info">Showing first 5 matches</li>}
          {filteredList.map((country, i) => i >= 5
            ? null
            :
            <li key={country} className={i === this.state.candidate ? 'active' : ''}>
              <button
                onClick={() => onCountrySelect(country)}
              >{country}
              </button>
            </li>)}
        </FilteredList>
        }
      </div>
    );
  }
}

CountryTitle.propTypes = {
  title: PropTypes.string,
  filteredList: PropTypes.array,
  onCountrySelect: PropTypes.func,
};

export default CountryTitle;
