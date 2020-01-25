import React from 'react';

function IDtoName ({searchArray,uniqueID}) {

    var RealItemName = searchArray.filter((data)=>data.id.includes(uniqueID));

    return (RealItemName.length > 0)
        ? <div key={uniqueID}>{RealItemName[0].Name}</div>
        : <div key={uniqueID}>{uniqueID}</div>
}

export default IDtoName;