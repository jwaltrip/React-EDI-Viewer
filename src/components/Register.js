import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from "../actions/authActions";
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {}
    };
  }

  componentDidMount() {
    // if user is logged in, then they should not be able to access the Register page
    // redirect them to the homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    // if user is logged in, then they should not be able to access the Register page
    // redirect them to the homepage
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    // if there were any errors in registering the user, they will be added as props
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };

    // call redux action registerUser
    this.props.registerUser(user, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container" style={{ width: 450 }}>
        <h2 style={{ marginBottom: 40 }}>Registration</h2>
        <div className="container">
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className={classnames('form-control', {
                  'is-invalid': errors.name
                })}
                name="name"
                onChange={ this.handleInputChange }
                value={ this.state.name }
              />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={classnames('form-control', {
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
                className={classnames('form-control', {
                  'is-invalid': errors.password
                })}
                name="password"
                onChange={ this.handleInputChange }
                value={ this.state.password }
              />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className={classnames('form-control', {
                  'is-invalid': errors.password_confirm
                })}
                name="password_confirm"
                onChange={ this.handleInputChange }
                value={ this.state.password_confirm }
              />
              {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary float-right">Register User</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.authErrors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));