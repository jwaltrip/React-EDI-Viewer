import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// higher order component that ensures user is authenticated before rendering route component
// if not logged in, redirect to login page
const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated ?
      ( <Component {...props} /> ) :
      ( <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} /> )
  )} />
);

ProtectedRoute.displayName = 'ProtectedRoute';
ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ProtectedRoute);