import PropTypes from 'prop-types';
import React from 'react';

const DisplayText = ({ columns, leftText, rightText }) => {
  if (leftText === 'Squad') {
    return (
      <div data-test="displayText" className={`col-md-${columns} d-flex d-inline-block justify-content-md-center pt-4 pt-md-0`}>
        <div className="d-md-none text-warning">
          {leftText}
          :&nbsp;
        </div>
        <div className="d-block d-md-none text-info">{rightText}</div>
        <div className="d-none d-md-block">{rightText}</div>
      </div>
    );
  }

  return (
    <div className={`col-md-${columns} d-flex d-inline-block justify-content-md-center`}>
      <div className="d-md-none text-warning">
        {leftText}
        :&nbsp;
      </div>
      <div>{rightText}</div>
    </div>
  );
};

DisplayText.propTypes = {
  columns: PropTypes.number,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
};

DisplayText.defaultProps = {
  columns: null,
  leftText: null,
  rightText: null,
};

export default DisplayText;
