import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavBar.scss';
import FirebaseContext from "../firebase/FirebaseContext";

function MainNavBar () {
    const {isLoggedIn,setisLoggedIn} = useContext(FirebaseContext);

    function switchStatus () {
        var opposite = !isLoggedIn;
        setisLoggedIn(opposite);
        if (opposite) {window.location.hash = '/armies/view'}
        else {window.location.hash = '/'}
    }

    return (isLoggedIn) ? (
        <nav className="navbar navbar-expand-md bg-secondary fixed-top p-1">
            <div className="navbar-nav navbar-brand">
                <NavLink to="/" className="nav-link px-3 py-1">Home Page</NavLink>
                <NavLink to="/armies/view" className="nav-link px-3 py-1" activeClassName="chosen">Armies</NavLink>
                <NavLink to="/squads/view" className="nav-link px-3 py-1" activeClassName="chosen">Squads</NavLink>
                <NavLink to="/units/view" className="nav-link px-3 py-1" activeClassName="chosen">Units</NavLink>
                <NavLink to="/equipment/view" className="nav-link px-3 py-1" activeClassName="chosen">Equipment</NavLink>
            </div>
            <div className="navbar-nav navbar-brand ml-auto">
                <NavLink to="/userprofile" className="nav-link px-3 py-1" activeClassName="chosen">Your Profile</NavLink>
                <button type="button" className="btn btn-success" onClick={switchStatus}>Logout</button>
            </div>
        </nav>
    ) : (
        <nav className="navbar navbar-expand-sm bg-secondary fixed-top p-1">
            <div className="navbar-nav navbar-brand">
                <NavLink to="/" className="nav-link px-3 py-1">Home Page</NavLink>
            </div>
            <div className="navbar-nav navbar-brand ml-auto">
                <NavLink to="/auth/login" className="nav-link px-3 py-1" activeClassName="chosen">Login</NavLink>
                <NavLink to="/auth/register" className="nav-link px-3 py-1" activeClassName="chosen">Register</NavLink>
                <button type="button" className="btn btn-success" onClick={switchStatus}>Login</button>
            </div>
        </nav>
    )
}

export default MainNavBar;