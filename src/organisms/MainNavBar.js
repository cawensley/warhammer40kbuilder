import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavBar.scss';
import store from "../Redux/store";
import LoginChange from "../Redux/actions/LoginChange";

function MainNavBar () {

    function switchStatus () {
        var opposite = !store.getState().loginstatus;
        store.dispatch(LoginChange(opposite));
        window.location.hash = '/';
        window.location.reload();
    }

    return (store.getState().loginstatus) ? (
        <nav className="navbar navbar-expand-lg bg-secondary fixed-top p-1">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span className="text-primary"><i className="fas fa-bars" /></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="navbar-brand">
                        <NavLink to="/" className="nav-link px-3 py-1">Home Page</NavLink>
                    </li>
                    <li className="navbar-brand">
                        <NavLink to="/armies/view" className="nav-link px-3 py-1" activeClassName="chosen">Armies</NavLink>
                    </li>
                    <li className="navbar-brand">
                        <NavLink to="/squads/view" className="nav-link px-3 py-1" activeClassName="chosen">Squads</NavLink>
                    </li>
                    <li className="navbar-brand">
                        <NavLink to="/units/view" className="nav-link px-3 py-1" activeClassName="chosen">Units</NavLink>
                    </li>
                    <li className="navbar-brand">
                        <NavLink to="/equipment/view" className="nav-link px-3 py-1" activeClassName="chosen">Equipment</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-brand">
                <NavLink to="/userprofile" className="nav-link px-3 py-1" activeClassName="chosen">Your Profile</NavLink>
            </div>
            <button className="btn btn-success" onClick={switchStatus}>Logout</button>
        </nav>
    ) : (
        <nav className="navbar navbar-expand-sm bg-secondary fixed-top p-1">
            <div className="navbar-nav navbar-brand">
                <NavLink to="/" className="nav-link px-3 py-1">Home Page</NavLink>
            </div>
            <div className="navbar-nav navbar-brand ml-auto">
                <NavLink to="/auth/login" className="nav-link px-3 py-1" activeClassName="chosen">Login</NavLink>
                <NavLink to="/auth/register" className="nav-link px-3 py-1" activeClassName="chosen">Register</NavLink>
                <button className="btn btn-success" onClick={switchStatus}>Login</button>
            </div>
        </nav>
    )
}

export default MainNavBar;