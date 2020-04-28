import React from 'react';
import PropTypes from 'prop-types';

const TextRow = ({ left, right }) => (
  <h3 data-test="textRow" className="row mt-4">
    <div className="text-warning col-4 col-md-6 text-right"><u>{left}</u></div>
    <div className="text-white col-8 col-md-6 text-left">{right}</div>
  </h3>
);

TextRow.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
};

TextRow.defaultProps = {
  left: null,
  right: null,
};


export default TextRow;
