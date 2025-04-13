import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaTasks className="navbar-icon" />
          <span>Task Manager</span>
        </Link>
        <ul className="nav-menu">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <span className="nav-username">
                  Welcome, {localStorage.getItem('username')}
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
