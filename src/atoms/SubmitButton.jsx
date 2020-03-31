import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ buttontext }) => (
  <div className="mt-4" data-test="component-button">
    <button type="submit" className="btn btn-success">{buttontext}</button>
  </div>
);

SubmitButton.propTypes = {
  buttontext: PropTypes.string,
};

SubmitButton.defaultProps = {
  buttontext: null,
};

export default SubmitButton;
