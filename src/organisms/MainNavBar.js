import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import './NavBar.scss';
import store from "../Redux/store";
import LoginChange from "../Redux/actions/LoginChange";

function MainNavBar () {
    const userName = "Test User 1";
    const [navLeftClass,setNavLeftClass]=React.useState("collapse navbar-collapse ");
    const [navRightClass,setNavRightClass]=React.useState("dropdown-menu dropdown-menu-right bg-secondary ");

    function handleLeftButtonClick () {
        if (!navLeftClass.includes("show")) {setNavLeftClass(navLeftClass.concat("show"))}
        else {setNavLeftClass("collapse navbar-collapse ")}
    }

    function handleRightButtonClick () {
        if (!navRightClass.includes("show")) {setNavRightClass(navRightClass.concat("show"))}
        else {setNavRightClass("dropdown-menu dropdown-menu-right bg-secondary ")}
    }

    function handleLogout () {
        store.dispatch(LoginChange(false));
        window.location.hash = '/'
    }

    return (
        <nav className="navbar navbar-expand-md bg-secondary fixed-top p-1">
            <button className="navbar-toggler" type="button" onClick={()=>handleLeftButtonClick()}>
                <span className="text-primary"><i className="fas fa-bars" /></span>
            </button>

            <div className={navLeftClass} onClick={()=>handleLeftButtonClick()}>
                <ul className="navbar-nav">
                    <li className="navbar-brand">
                        <NavLink to="/" className="nav-link px-3 py-1">Home Page</NavLink>
                    </li>
                    <li className="navbar-brand">
                        <NavLink to="/armies/view" className="nav-link px-3 py-1" activeClassName="chosen">Armies</NavLink>
                    </li>
                    <li className="navbar-brand">
                        <NavLink to="/squads/view" className="nav-link px-3 py-1" activeClassName="chosen">Squads</NavLink>
                    </li><li className="navbar-brand">
                    <NavLink to="/units/view" className="nav-link px-3 py-1" activeClassName="chosen">Units</NavLink>
                </li><li className="navbar-brand">
                    <NavLink to="/equipment/view" className="nav-link px-3 py-1" activeClassName="chosen">Equipment</NavLink>
                </li>
                </ul>
            </div>
            <div className="btn-group ml-auto">
                <button type="button" className="btn btn-success dropdown-toggle" onClick={()=>handleRightButtonClick()}>
                    {userName}
                </button>
                <div className={navRightClass} onClick={()=>handleRightButtonClick()}>
                    <Link to="/userprofile" className="dropdown-item bg-secondary">Your Profile</Link>
                    <button type="button" className="dropdown-item bg-secondary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default MainNavBar;