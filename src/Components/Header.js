import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header class="header">
    <h1 class="header__title">BookShare</h1>
    <h2 class="header__subtitle">Sharing your books since 2018.</h2>
    <div class="flex-container">
      <div class="link">
        <NavLink to="/" activeClassName="is-active" exact={true} class="nav">Home</NavLink>
      </div>
      <div class="link">
        <NavLink to="/register" activeClassName="is-active" class="nav">Register</NavLink>
      </div>
      <div class="link">
        <NavLink to="/login" activeClassName="is-active" class="nav">Login</NavLink>
      </div>
    </div>
  </header>
);

export default Header;