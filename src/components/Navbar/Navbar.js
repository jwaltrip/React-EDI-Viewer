import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchForm from "../SearchForm";

class Navbar extends Component {

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // this is utilizing fragments
    const authLinks = ([
      <ul key={`nav-1`} className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/posts">Posts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders/1">Orders</Link>
        </li>
      </ul>,
      <SearchForm key={`nav-2`} />
      ,
      <ul key={`nav-3`} className="navbar-nav ml-auto">
        <a className="nav-link" href="#" onClick={ this.onLogout }>
          <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: 25, marginRight: 5 }}
          />
          Logout
        </a>
      </ul>
    ]);

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">Redux Auth</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default Navbar;