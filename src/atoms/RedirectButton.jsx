import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectButton = ({ redirect, buttontext }) => (
  <div className="mt-3" data-test="component-button">
    <NavLink to={redirect} className="btn btn-success">{buttontext}</NavLink>
  </div>
);

RedirectButton.propTypes = {
  redirect: PropTypes.string,
  buttontext: PropTypes.string,
};

RedirectButton.defaultProps = {
  redirect: '/',
  buttontext: null,
};

export default RedirectButton;
