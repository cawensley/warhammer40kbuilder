import React from 'react';

function InputRow ({left,right,type}) {
    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">
                <input
                    onChange={e=>{localStorage.setItem(`${right}`,e.target.value);}}
                    placeholder={`Enter ${type}`}
                    type={`${type}`}>
                </input>
            </div>
        </div>
    )
}

export default InputRow;