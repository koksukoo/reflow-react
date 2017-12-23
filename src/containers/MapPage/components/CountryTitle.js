import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

    &:hover,
    &:focus {
      background-color: #fff;
    }
  }
`;

let SearchForm = ({ handleSubmit }) => (
  <StyledForm onSubmit={handleSubmit}>
    <Field name="country" component="input" type="text" />
  </StyledForm>
);
SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
};
SearchForm = reduxForm({ form: 'search' })(SearchForm);
SearchForm = connect((state) => ({
  initialValues: {
    country: state.map.selectedCountry,
  },
}), {})(SearchForm);


function CountryTitle({ title, onSubmit }) {
  return (
    <div>
      {!!title &&
      <SearchForm
        onSubmit={onSubmit}
      />
      }
    </div>
  );
}

CountryTitle.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default CountryTitle;
