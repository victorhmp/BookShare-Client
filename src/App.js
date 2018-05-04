import React, { Component } from 'react';
import AppRouter from './routers/AppRouter';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <AppRouter />
    );
  }
}

export default App;