import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {
  const isLoggedOut = <p><Link to="/register">Register</Link> or <Link to="/login">Log in</Link> to see the Posts!</p>;
  const isLoggedIn = <p>Check out the <Link to="/posts">Posts!</Link></p>;

  return (
    <div className="container" style={{ width: 700 }}>
      <h2>Home Page</h2>
      <hr/>
      {props.auth.isAuthenticated ? isLoggedIn : isLoggedOut}
    </div>
  );
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