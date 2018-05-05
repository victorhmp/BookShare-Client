import React, { Component } from 'react';
import Auth from '../Modules/Auth';
import '../App.css';
import axios from 'axios';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import NotFoundPage from './NotFoundPage';
import Header from './Header';
import Home from './Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault();
    axios.post(`http://localhost:3000/users`, JSON.stringify({
      user: data,
    }), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      Auth.authenticateToken(response.data);
      this.setState({
        auth: Auth.isUserAuthenticated()
      });
    }).catch(err => {
      console.log(err);
    })
  }

  handleLoginSubmit(e, data) {
    e.preventDefault();
    axios.post(`http://localhost:3000/login`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      Auth.authenticateToken(response.data);
      this.setState({
        auth: Auth.isUserAuthenticated()
      });
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route 
              path="/register" 
              render={() => <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit}/>}
            />
            <Route 
              path="/login" 
              render={() => <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;