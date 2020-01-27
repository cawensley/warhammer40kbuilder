import React from 'react';

function InputRow ({type,left,onInputChange}) {

    function handleInputChange(event) {onInputChange(event.target.value)}

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">
                <input
                    min="1"
                    size="20"
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