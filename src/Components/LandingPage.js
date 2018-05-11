import React from 'react';
import logo from '../images/logo/swab-logo.png'

const Home = () => (
  <section id="header">
    <div className="section-wrapper">
    <img src={logo} alt="logo" className="logo"/>
    <h1>Welcome to BookShare!</h1>
    <p>Please login or register a new user to get started!</p>
    </div>
  </section>
);

export default Home;