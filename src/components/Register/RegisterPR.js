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
      width: '700px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '> span': {
        margin: '10px',
        width: '100%'
      }
    });

    const formTagStyle = css({
      margin: '0 auto',
      width: '700px'
    });

    const submitBtnStyle = css({
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      '> button': {
        margin: '10px 69px 20px auto'
      }
    });

    return (
      <div className="container" style={{ width: 700 }}>
        <h2 style={{ marginBottom: 40 }}>Registration</h2>
        <form onSubmit={ this.handleSubmit } {...formTagStyle}>
          <div {...formContainerStyle}>
            <span className="p-float-label">
              <InputText
                type="text"
                name="name"
                className={classnames({ 'p-error': errors.name })}
                id="name-float-label"
                size="50"
                value={ this.state.name }
                onChange={ this.handleInputChange }
              />
              <label htmlFor="username-float-label">Name</label>
              {errors.name && (<Message severity="error" text="Name is required" style={{ marginLeft: 10 }} />)}
            </span>

            <span className="p-float-label">
              <InputText
                type="text"
                name="email"
                className={classnames({ 'p-error': errors.email })}
                id="email-float-label"
                size="50"
                value={ this.state.email }
                onChange={ this.handleInputChange }
              />
              <label htmlFor="email-float-label">Email</label>
              {errors.email && (<Message severity="error" text="Email is required" style={{ marginLeft: 10 }} />)}
            </span>

            <span className="p-float-label">
              <InputText
                type="password"
                name="password"
                className={classnames({ 'p-error': errors.password })}
                id="password-float-label"
                size="50"
                value={ this.state.password }
                onChange={ this.handleInputChange }
              />
              <label htmlFor="password-float-label">Password</label>
              {errors.password && (<Message severity="error" text="Password is required" style={{ marginLeft: 10 }} />)}
            </span>

            <span className="p-float-label">
              <InputText
                type="password"
                name="password_confirm"
                className={classnames({ 'p-error': errors.password_confirm })}
                id="password_confirm-float-label"
                size="50"
                value={ this.state.password_confirm }
                onChange={ this.handleInputChange }
              />
              <label htmlFor="password_confirm-float-label">Confirm Password</label>
              {errors.password_confirm && (<Message severity="error" text="Confirm password is required" style={{ marginLeft: 10 }} />)}
            </span>

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