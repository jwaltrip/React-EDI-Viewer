import React, { Component } from 'react';

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

    console.log(user);
  };

  render() {
    return (
      <div className="container" style={{ marginTop: 50, width: 700 }}>
        <h2 style={{ marginBottom: 40 }}>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={ this.handleInputChange }
              value={ this.state.email }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login User</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;