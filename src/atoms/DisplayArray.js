import React from 'react';
import IDtoName from "./IDtoName";

function DisplayArray ({collectionName,left,array}) {

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">
                {array.length === 0
                    ? "No Gear Selected"
                    : array.map((item)=><IDtoName key={item} collectionName={`${collectionName}`} uniqueID={item}/>)
                }
            </div>
        </div>
    )
}

export default DisplayArray;