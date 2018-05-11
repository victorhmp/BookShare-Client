import React from 'react';

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
      <section>
        <div className="section-wrapper form">
          <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
            <input 
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button>Log in!</button>
          </form>
        </div>
      </section>
    )
  }
}

export default LoginForm;