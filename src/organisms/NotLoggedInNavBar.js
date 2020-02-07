import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';

function NotLoggedInNavBar () {
    const [navClass,setNavClass]=React.useState("dropdown-menu dropdown-menu-right bg-secondary ");

    function handleButtonClick () {
        if (!navClass.includes("show")) {setNavClass(navClass.concat("show"))}
        else {setNavClass("dropdown-menu dropdown-menu-right bg-secondary ")}
    }

    return (
        <nav data-test="NotLoggedInNavBar" className="navbar navbar-expand-sm bg-secondary fixed-top p-1" >
            <div className="navbar-nav navbar-brand">
                <Link to="/" className="nav-link px-3 py-1">Home Page</Link>
            </div>
            <div className="btn-group ml-auto">
                <button data-test="dropdownButton" type="button" className="btn btn-success dropdown-toggle"
                        onClick={()=>handleButtonClick()}>
                    Login
                </button>
                <div data-test="dropdown" className={navClass} onClick={()=>handleButtonClick()}>
                    <Link to="/auth/login" className="dropdown-item bg-secondary">Login</Link>
                    <Link to="/auth/register" className="dropdown-item bg-secondary">Register</Link>
                </div>
            </div>
        </nav>
    )
}

export default NotLoggedInNavBar;