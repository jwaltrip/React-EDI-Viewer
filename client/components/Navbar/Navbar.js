import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

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
          <Link className="nav-link" to="/orders/1">Orders</Link>
        </li>
      </ul>,
      <ul key={`nav-2`} className="navbar-nav ml-auto">
        {/* the inline search form w/ date picker */}
        <SearchForm />

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <img
              src={user.avatar}
              alt={user.name}
              title={user.name}
              className="rounded-circle mr-2"
              style={{ width: 25, marginRight: 5 }}
            />
            {user.name}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={ this.onLogout }>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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
        <Link className="navbar-brand" to="/">Lumaprints EDI Viewer</Link>
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