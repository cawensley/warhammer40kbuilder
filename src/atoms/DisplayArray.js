import React from 'react';

function DisplayArray ({left,array}) {

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">
                {array.length === 0
                    ? "Nothing Selected"
                    : array.map((item)=><div key={item}>{item}</div>)
                }
            </div>
        </div>
    )
}

export default DisplayArray;