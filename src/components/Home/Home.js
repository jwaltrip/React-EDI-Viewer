import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {
  if (props.auth.isAuthenticated) {
    return <Redirect to="/orders/1" />;
  } else {
    return <Redirect to="/login" />;
  }
};

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Home);