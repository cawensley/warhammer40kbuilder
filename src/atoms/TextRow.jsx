import React from 'react';
import PropTypes from 'prop-types';

function TextRow({ left, right }) {
  return (
    <div data-test="textRow" className="row h3 mt-4">
      <div className="text-warning col-6 text-right"><u>{left}</u></div>
      <div className="text-white col-6 text-left">{right}</div>
    </div>
  );
}

TextRow.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
};

TextRow.defaultProps = {
  left: null,
  right: null,
};


export default TextRow;
