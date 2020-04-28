import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';

const NotLoggedInNavBar = () => {
  const [show, setShow] = React.useState('');

  function handleNavClick() { if (show === '') { setShow('show'); } else setShow(''); }

  return (
    <nav data-test="NotLoggedInNavBar" className="navbar navbar-expand-sm bg-secondary fixed-top p-1">
      <NavLink to="/" className="o-navbar-hover">
        <img alt="Error Loading" src={require('../utilities/wh40klogo.png')} />
      </NavLink>
      <div className="btn-group ml-auto">
        <button
          data-test="dropdownButton"
          type="button"
          className="btn btn-success dropdown-toggle"
          onClick={() => handleNavClick()}
        >
          Login
        </button>
        <div
          data-test="dropdown"
          role="button"
          className={`dropdown-menu dropdown-menu-right bg-secondary ${show}`}
          onClick={() => handleNavClick()}
          onKeyDown={() => handleNavClick()}
          tabIndex={0}
        >
          <Link to="/auth/login" className="dropdown-item bg-secondary">Login</Link>
          <Link to="/auth/register" className="dropdown-item bg-secondary">Register</Link>
          <Link to="/auth/passwordreset" className="dropdown-item bg-secondary">Forgot Password?</Link>
        </div>
      </div>
    </nav>
  );
};

export default NotLoggedInNavBar;
