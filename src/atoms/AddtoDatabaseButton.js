import React from 'react';
import {NavLink} from "react-router-dom";

function AddtoDatabaseButton ({redirect,buttontext}) {
    return (
        <div className="mt-3">
            <NavLink to={redirect} className="btn btn-success">{buttontext}</NavLink>
        </div>
    )
}

export default AddtoDatabaseButton;