import React from 'react';
import {NavLink} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val,
    });
  }

  render() {
    return (
      <section id="header"> 
        <div className="section-wrapper-form">          
          <span className="login-title">Login</span>
          <form className="login-form" onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
            <input 
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input 
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <NavLink id="forgot-pass" to="/recover">Forgot your password?</NavLink>
            <div className="button-container">
              <button className="form-button">Submit</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default LoginForm;