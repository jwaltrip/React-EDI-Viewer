import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import SearchForm from "../SearchForm";

class TopNavbar extends Component {

  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  state = {
    isOpen: false
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // order link next to NavbarBrand
    // only rendered if authenticated
    const orderLink = (
      <NavItem>
        <NavLink tag={Link} to="/orders/1">Orders</NavLink>
      </NavItem>
    );

    // search form, logout
    // only rendered if authenticated
    const authLinks = (
      <ul className='navbar-nav'>
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
    );

    // navbar links when logged out
    const guestLinks = (
      <ul className="navbar-nav">
        <NavItem>
          <NavLink tag={Link} to="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/login">Login</NavLink>
        </NavItem>
      </ul>
    );

    return (
      <Navbar color='dark' dark expand='lg' className="mb-4">
        <NavbarBrand tag={Link} to="/">Lumaprints EDI Viewer</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className={'mr-auto'} navbar>
            { isAuthenticated ? orderLink : null }
          </Nav>
          <Nav className={'ml-auto'} navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default TopNavbar;