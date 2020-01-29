import React,{useContext} from 'react';
import { NavLink,Link } from 'react-router-dom';
import './NavBar.scss';
import FirebaseContext from "../firebase/FirebaseContext";

function MainNavBar () {
    const {setisLoggedIn} = useContext(FirebaseContext);
    const userName = "Test User 1";

    function toggleNavBar (input) {
        document.getElementById(`${input}`).classList.toggle("show");
    }

    function closeMenu (input) {
        document.getElementById(`${input}`).classList.remove("show");
    }

    function handleLogout () {
        setisLoggedIn(false);
        window.location.hash = '/'
    }

    return (
        <nav className="navbar navbar-expand-md bg-secondary fixed-top p-1">
            <button className="navbar-toggler" type="button" onClick={()=>toggleNavBar("leftMenu")}>
                <span className="text-primary"><i className="fas fa-bars" /></span>
            </button>

            <div className="collapse navbar-collapse" id="leftMenu" onClick={()=>closeMenu("leftMenu")}>
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
                <button type="button" className="btn btn-success dropdown-toggle"
                        onClick={()=>toggleNavBar("RightMenu")}>
                    {userName}
                </button>
                <div className="dropdown-menu dropdown-menu-right bg-secondary collapse" id="RightMenu"
                     onClick={()=>closeMenu("RightMenu")}>
                    <Link to="/userprofile" className="dropdown-item bg-secondary">Your Profile</Link>
                    <button type="button" className="dropdown-item bg-secondary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default MainNavBar;