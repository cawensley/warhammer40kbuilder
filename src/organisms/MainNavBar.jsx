import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';
import { connect } from 'react-redux';
import store from '../Redux/store';
import user from '../Redux/reducers/user';

const MainNavBar = () => {
  const [state, setState] = React.useState({ leftMenu: '', rightMenu: '' });

  function handleLeftClick() {
    if (state.leftMenu === '') { setState({ ...state, leftMenu: ('show') }); } else setState({ ...state, leftMenu: ('') });
  }
  function handleRightClick() {
    if (state.rightMenu === '') { setState({ ...state, rightMenu: ('show') }); } else setState({ ...state, rightMenu: ('') });
  }

  async function handleLogout() {
    await firebase.auth().signOut();
    window.location = '/';
  }

  return (
    <nav data-test="MainNavBar" className="navbar navbar-expand-md bg-secondary fixed-top p-1">
      <button data-test="leftdropdownButton" className="navbar-toggler" type="button" onClick={() => handleLeftClick()}>
        <span className="text-primary"><i className="fas fa-bars" /></span>
      </button>

      <div
        data-test="leftdropdownMenu"
        role="button"
        className={`collapse navbar-collapse ${state.leftMenu}`}
        onClick={() => handleLeftClick()}
        onKeyDown={() => handleLeftClick()}
        tabIndex={0}
      >
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
      <div className="btn-group ml-auto">
        <button
          data-test="rightdropdownButton"
          type="button"
          className="btn btn-success dropdown-toggle"
          onClick={() => handleRightClick()}
        >
          {store.getState().user.Name}
        </button>
        <div
          data-test="rightdropdownMenu"
          role="button"
          className={`dropdown-menu dropdown-menu-right bg-secondary ${state.rightMenu}`}
          onClick={() => handleRightClick()}
          onKeyDown={() => handleRightClick()}
          tabIndex={0}
        >
          <Link to="/userprofile" className="dropdown-item bg-secondary">View Profile</Link>
          <button
            data-test="logoutButton"
            type="button"
            className="dropdown-item bg-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default connect(user)(MainNavBar);
