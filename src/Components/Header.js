import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header class="header">
    <h1 class="header__title">BookShare</h1>
    <h2 class="header__subtitle">Sharing your books since 2018.</h2>
    <div class="navlink-container">
      <div class="navlink-div">
        <NavLink exact to="/" activeClassName="is-active">Home</NavLink>
      </div>
      <div class="navlink-div">
        <NavLink to="/register" activeClassName="is-active">Register</NavLink>
      </div>
      <div class="navlink-div">
        <NavLink to="/login" activeClassName="is-active">Login</NavLink>
      </div>
    </div>
  </header>
);

export default Header;