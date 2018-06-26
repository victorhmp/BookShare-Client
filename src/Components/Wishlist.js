import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
      <span><div id="wishlist-header">
        <center>
          <h3 id="wishlistHeader-title">YOUR WISHLISTS</h3>
          </center>
        <div className="button-container">
          <NavLink to="/wishlistsCreate">
            <button className="form-button">New Wishlist</button>
          </NavLink>                       
        </div>  
      </div>
      <div id="wishlist-section">
        <div className="wishlist-container"> 
          {(this.state.wishlistsLoaded) 
          ? this.state.myWishlists.map(wishlist => {
            return (
              <div className="wishlist" key={wishlist.id}>
                <center>
                  <h2>{wishlist.name}</h2>
                  </center>
                <center>
                  <p id="wishlist-description">{wishlist.description}</p>
                  </center>
                <div id="wishlist-btns">
                  <NavLink to={'/wishlistItemsCreate/' + wishlist.id}>
                    <button type="submit" className="form-button">Add on List</button>
                  </NavLink>
                  <NavLink to={'/wishlistsUpdate/' + wishlist.id}>
                    <button type="submit" className="form-button">Update List</button>
                  </NavLink>  
                  <form className="delWLform" onSubmit={(e) => this.props.handleWishlistDelete(wishlist.id)}>
                    <button type="submit" className="form-button" >Delete List</button>
                  </form> 
                </div>                                
                <WishlistItem wishlist = {wishlist} handleWishlistItemDelete = {this.props.handleWishlistItemDelete}/>                         
              </div>
            );
          })
          : <div id="loader-bg"><center><div class="loader" /></center></div>
          }                    
        </div>
      </div></span>
    );
  }
}

export default Wishlist;