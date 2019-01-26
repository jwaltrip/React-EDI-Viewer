import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // if user is authenticated, then redirect them to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    // if user is authenticated, then redirect them to homepage
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    // if there are errors in the loginUser redux action, add errors to props
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
      email: this.state.email,
      password: this.state.password
    };

    // call redux action loginUser
    this.props.loginUser(user);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container" style={{ width: 450 }}>
        <h2 style={{ marginBottom: 40 }}>Login</h2>
        <div className="container">
          <form onSubmit={ this.handleSubmit }>
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
              <button type="submit" className="btn btn-primary float-right">Login User</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;