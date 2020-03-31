import React from 'react';
import PropTypes from 'prop-types';

const NumberInputRow = ({ left, onInputChange, startValue }) => {
  function handleInputChange(event) { onInputChange(event.target.value); }

  return (
    <div className="row mt-4" data-test="inputRow">
      <div className="text-warning col-6 text-right">{left}</div>
      <div className="text-white col-6 text-left">
        <input
          data-test="input-box"
          min="0"
          size="20"
          autoComplete="off"
          value={startValue}
          required
          onChange={(event) => handleInputChange(event)}
          placeholder="Enter number"
          type="number"
        />
      </div>
    </div>
  );
};

NumberInputRow.propTypes = {
  left: PropTypes.string,
  onInputChange: PropTypes.func,
  startValue: PropTypes.number,
};

NumberInputRow.defaultProps = {
  left: null,
  onInputChange: null,
  startValue: null,
};

export default NumberInputRow;
