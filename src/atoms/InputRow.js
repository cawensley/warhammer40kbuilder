import React from 'react';

function InputRow ({type,left,onInputChange,startValue}) {

    function handleInputChange(event) {onInputChange(event.target.value)}

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">
                <input
                    min="0"
                    size="20"
                    value={startValue}
                    required
                    onChange={event=>handleInputChange(event)}
                    placeholder={`Enter ${type}`}
                    type={`${type}`}>
                </input>
            </div>
        </div>
    )
}

export default InputRow;