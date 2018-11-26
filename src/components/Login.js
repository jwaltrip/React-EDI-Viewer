import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from "../actions/authActions";
import classnames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    // call redux action loginUser
    this.props.loginUser(user);
  };

  // if there are errors in the loginUser redux action, add errors to props
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container" style={{ marginTop: 50, width: 700 }}>
        <h2 style={{ marginBottom: 40 }}>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name="email"
              onChange={ this.handleInputChange }
              value={ this.state.email }
            />
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password
              })}
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login User</button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);