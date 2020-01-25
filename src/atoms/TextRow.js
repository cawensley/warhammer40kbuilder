import React from 'react';

function TextRow ({left,right}) {
    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">{right}</div>
        </div>
    )
}

export default TextRow;