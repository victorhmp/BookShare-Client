import React from 'react';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  onSubmit(e) {
    e.preventDefault();
  } 

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="Username"
          />
          <input 
            type="password"
            placeholder="Password"
          />
          <button>Login!</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;