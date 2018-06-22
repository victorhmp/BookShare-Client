import React from 'react';
import axios from 'axios';
import {NavLink, Link} from 'react-router-dom';

import Auth from '../Modules/Auth';
import WishlistItem from './WishlistItem';

class Wishlist extends React.Component {
  constructor() {
    super();
    this.state = {
      myWishlists: null,
      wishlistsLoaded: false,
    }    
  }

  componentDidMount() {
    axios.get('http://localhost:3000/profile', {
      headers: {
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      this.setState({
        myWishlists: response.data.wishlists,
        wishlistsLoaded: true
      })
    }).catch((err) => console.log(err));
  }

  render() {    
    return (
      <body id="wishlist-body">
        <div className="section-wrapper">
          <div className="button-container">
            <NavLink to="/wishlistsCreate">
              <button className="form-button">New Wishlist</button>
            </NavLink>                       
          </div>  
          {(this.state.wishlistsLoaded) 
          ? this.state.myWishlists.map(wishlist => {
            return (
              <div className="wishlist" key={wishlist.id}>
                <h1><Link to={'/wishlistItemsCreate/' + wishlist.id}>{wishlist.name}</Link></h1>
                <p id="wish-desc">{wishlist.description}</p>
                <div id="wishlist-btns">
                  <form className="delWLform" onSubmit={(e) => this.props.handleWishlistDelete(wishlist.id)}>
                    <button type="submit" className="form-button">Delete this Wishlist</button>
                  </form> 
                  <NavLink to={'/wishlistsUpdate/' + wishlist.id}>
                    <button type="submit" className="form-button">Update this Wishlist</button>
                  </NavLink>  
                </div>
                <WishlistItem wishlist = {wishlist} handleWishlistItemDelete = {this.props.handleWishlistItemDelete}/>                         
              </div>
            );
          })
          : <div class="loader" />
          }                    
        </div>
      </body>
    );
  }
}

export default Wishlist;