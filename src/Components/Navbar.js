import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo/swab-logo.png'

// const Navbar = () => (
//   <header>
//     <h1>BookShare</h1>
//     <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
//     <NavLink to="/register" activeClassName="is-active">Register</NavLink>
//     <NavLink to="/login" activeClassName="is-active">Login</NavLink>
//   </header>
// );

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <ul className="navbar__items" role="navigation">
          <li> <NavLink to={this.props.loggedIn ? "/dash" : "/"} exact={true}> <img src={logo} className="navbar__logo" alt="logo" /> </NavLink> </li>
          <li> <NavLink to={this.props.loggedIn ? "/dash" : "/"} exact={true}>Home</NavLink> </li>

          {this.props.loggedIn ? 
            <div className="right">
              <li> <NavLink to={this.props.loggedIn ? "/wishlists" : "/"} exact={true}>My Wishlists</NavLink> </li>
              <li> <NavLink to={this.props.loggedIn ? "/profile" : "/"} exact={true}>My Profile</NavLink> </li>
              <li> <span onClick={this.props.handleLogout}>Logout</span> </li>            </div>
            :
            <div className="right">
              <li> <NavLink to="/register">Register</NavLink> </li>
              <li> <NavLink to="/login">Login</NavLink> </li>
            </div>
          }
        </ul>
      </nav>
    );
  }
}

export default Navbar;