import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';

function NotLoggedInNavBar () {
    const [show,setShow]=React.useState("");

    function handleNavClick () {(show === "") ? setShow("show") : setShow("")}

    return (
        <nav data-test="NotLoggedInNavBar" className="navbar navbar-expand-sm bg-secondary fixed-top p-1" >
            <div className="navbar-nav navbar-brand">
                <Link to="/" className="nav-link px-3 py-1">Home Page</Link>
            </div>
            <div className="btn-group ml-auto">
                <button data-test="dropdownButton" type="button" className="btn btn-success dropdown-toggle"
                        onClick={()=>handleNavClick()}>
                    Login
                </button>
                <div data-test="dropdown" className={"dropdown-menu dropdown-menu-right bg-secondary "+show} onClick={()=>handleNavClick()}>
                    <Link to="/auth/login" className="dropdown-item bg-secondary">Login</Link>
                    <Link to="/auth/register" className="dropdown-item bg-secondary">Register</Link>
                </div>
            </div>
        </nav>
    )
}

export default NotLoggedInNavBar;