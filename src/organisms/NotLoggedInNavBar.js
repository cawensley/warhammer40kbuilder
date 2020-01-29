import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';

function NotLoggedInNavBar () {

    function toggleNavBar (input) {
        document.getElementById(`${input}`).classList.toggle("show");
    }

    function closeMenu (input) {
        document.getElementById(`${input}`).classList.remove("show");
    }

    return (
        <nav className="navbar navbar-expand-sm bg-secondary fixed-top p-1" >
            <div className="navbar-nav navbar-brand">
                <Link to="/" className="nav-link px-3 py-1">Home Page</Link>
            </div>
            <div className="btn-group ml-auto">
                <button type="button" className="btn btn-success dropdown-toggle"
                        onClick={()=>toggleNavBar("RightMenu")}>
                    Login
                </button>
                <div className="dropdown-menu dropdown-menu-right bg-secondary" id="RightMenu" onClick={()=>closeMenu("RightMenu")}>
                    <Link to="/auth/login" className="dropdown-item bg-secondary">Login</Link>
                    <Link to="/auth/register" className="dropdown-item bg-secondary">Register</Link>
                </div>
            </div>
        </nav>
    )
}

export default NotLoggedInNavBar;