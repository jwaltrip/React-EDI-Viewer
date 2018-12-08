import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from "../../actions/authActions";
import classnames from 'classnames';
import { css } from 'glamor';
// primereact
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from '../../../node_modules/primereact/components/message/Message';

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

    // css styles using glamor
    const formContainerStyle = css({
      width: '500px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    });

    const formTagStyle = css({
      margin: '0 auto',
      width: '500px'
    });

    const submitBtnStyle = css({
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      '> button': {
        margin: '15px 75px 20px auto'
      }
    });

    const invalidFormMsg = css({
      textAlign: 'right',
    });

    const formGroup = css({
      marginBottom: '0'
    });

    return (
      <div className="container" style={{ width: 500 }}>
        <h2 style={{ marginBottom: 40 }}>Registration</h2>
        <form onSubmit={ this.handleSubmit } {...formTagStyle}>
          <div {...formContainerStyle}>
            <div className="form-group" {...formGroup}>
              <label htmlFor="name-label">Name</label><br/>
              <InputText
                type="text"
                name="name"
                className={classnames('form-control', { 'p-error is-invalid': errors.name })}
                id="name-label"
                size="40"
                value={ this.state.name }
                onChange={ this.handleInputChange }
              />

              {errors.name && (<div className="invalid-feedback" {...invalidFormMsg}>{errors.name}</div>)}
            </div>

            <div className="form-group" {...formGroup}>
              <label htmlFor="email-label">Email</label><br/>
              <InputText
                type="text"
                name="email"
                className={classnames('form-control', { 'p-error is-invalid': errors.email })}
                id="email-label"
                size="40"
                value={ this.state.email }
                onChange={ this.handleInputChange }
              />

              {errors.email && (<div className="invalid-feedback" {...invalidFormMsg}>{errors.email}</div>)}
            </div>

            <div className="form-group" {...formGroup}>
              <label htmlFor="password-label">Password</label><br/>
              <InputText
                type="password"
                name="password"
                className={classnames('form-control', { 'p-error is-invalid': errors.password })}
                id="password-label"
                size="40"
                value={ this.state.password }
                onChange={ this.handleInputChange }
              />

              {errors.password && (<div className="invalid-feedback" {...invalidFormMsg}>{errors.password}</div>)}
            </div>

            <div className="form-group" {...formGroup}>
              <label htmlFor="password_confirm-label">Confirm Password</label><br/>
              <InputText
                type="password"
                name="password_confirm"
                className={classnames('form-control', { 'p-error is-invalid': errors.password_confirm })}
                id="password_confirm-label"
                size="40"
                value={ this.state.password_confirm }
                onChange={ this.handleInputChange }
              />

              {errors.password_confirm && (<div className="invalid-feedback" {...invalidFormMsg}>{errors.password_confirm}</div>)}
            </div>

            <div {...submitBtnStyle}>
              <Button type="submit" label="Register User" />
            </div>
          </div>
        </form>
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