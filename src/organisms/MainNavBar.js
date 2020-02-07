import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import './NavBar.scss';
import store from "../Redux/store";
import LoginChange from "../Redux/actions/LoginChange";

function MainNavBar () {
    const userName = "Test User 1";
    const [showLeft,setShowLeft]=React.useState("");
    const [showRight,setShowRight]=React.useState("");

    function handleLeftClick () {(showLeft === "") ? setShowLeft("show") : setShowLeft("")}
    function handleRightClick () {(showRight === "") ? setShowRight("show") : setShowRight("")}

    function handleLogout () {
        store.dispatch(LoginChange(false));
        window.location.hash = '/'
    }

    return (
        <nav data-test="MainNavBar" className="navbar navbar-expand-md bg-secondary fixed-top p-1">
            <button data-test="leftdropdownButton" className="navbar-toggler" type="button" onClick={()=>handleLeftClick()}>
                <span className="text-primary"><i className="fas fa-bars" /></span>
            </button>

            <div data-test="leftdropdownMenu" className={"collapse navbar-collapse "+showLeft} onClick={()=>handleLeftClick()}>
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
                <button data-test="rightdropdownButton" type="button" className="btn btn-success dropdown-toggle"
                        onClick={()=>handleRightClick()}>
                    {userName}
                </button>
                <div data-test="rightdropdownMenu" className={"dropdown-menu dropdown-menu-right bg-secondary "+showRight}
                     onClick={()=>handleRightClick()}>
                    <Link to="/userprofile" className="dropdown-item bg-secondary">Your Profile</Link>
                    <button data-test="logoutButton" type="button" className="dropdown-item bg-secondary"
                            onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default MainNavBar;