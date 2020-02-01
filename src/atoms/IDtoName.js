import React from 'react';
import PropTypes from "prop-types";

function IDtoName ({searchArray,uniqueID}) {

    if (!searchArray || searchArray.length===0) {return <div data-test="name-absent" key={uniqueID}>{uniqueID}</div>}

    var RealItemName = searchArray.filter((data)=>data.id.includes(uniqueID));

    return (RealItemName.length > 0)
        ? <div data-test="name-found" key={uniqueID}>{RealItemName[0].Name}</div>
        : <div data-test="name-absent" key={uniqueID}>{uniqueID}</div>
}

IDtoName.propTypes = {
    uniqueID: PropTypes.string,
};

IDtoName.defaultProps = {
    uniqueID: null,
};

export default IDtoName;