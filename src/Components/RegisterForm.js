import React from 'react';

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      error: ''
    }
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
          <span class="register-title">Sign Up</span>
          <form class="register-form" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
            <input 
              class="input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input 
              class="input"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input 
              class="input"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div class="button-container">
              <button class="form-button">Register!</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default RegisterForm;