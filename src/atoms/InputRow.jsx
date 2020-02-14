import React from 'react';
import PropTypes from 'prop-types';

function InputRow({
  type, left, onInputChange, startValue,
}) {
  function handleInputChange(event) { onInputChange(event.target.value); }

  return (
    <div className="row mt-4" data-test="inputRow">
      <div className="text-warning col-6 text-right">{left}</div>
      <div className="text-white col-6 text-left">
        <input
          data-test="input-box"
          min="0"
          size="20"
          value={startValue}
          required
          onChange={(event) => handleInputChange(event)}
          placeholder={`Enter ${type}`}
          type={`${type}`}
        />
      </div>
    </div>
  );
}

InputRow.propTypes = {
  left: PropTypes.string,
  onInputChange: PropTypes.func,
  startValue: PropTypes.string,
  type: PropTypes.string,
};

InputRow.defaultProps = {
  left: null,
  onInputChange: null,
  startValue: null,
  type: null,
};


export default InputRow;
