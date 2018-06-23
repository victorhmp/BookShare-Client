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
      <span><section id="wish-header">
        <div className="section-wrapper">
          <h1 id="wish-title">Your Wishlists</h1>
          <div className="button-container">
            <NavLink to="/wishlistsCreate">
              <button className="form-button">New Wishlist</button>
            </NavLink>                       
          </div>  
        </div>
      </section>
      <section id="wishSect">
        <div className="WL-container"> 
          {(this.state.wishlistsLoaded) 
          ? this.state.myWishlists.map(wishlist => {
            return (
              <div className="wishlist" key={wishlist.id}>
                <center><h1 id="wish">{wishlist.name}</h1></center>
                <p id="wish-desc">{wishlist.description}</p>
                <div id="wishlist-btns">
                  <NavLink to={'/wishlistItemsCreate/' + wishlist.id}>
                    <button type="submit" className="form-button">Add to this Wishlist</button>
                  </NavLink>
                  <NavLink to={'/wishlistsUpdate/' + wishlist.id}>
                    <button type="submit" className="form-button">Update this Wishlist</button>
                  </NavLink>  
                  <form className="delWLform" onSubmit={(e) => this.props.handleWishlistDelete(wishlist.id)}>
                    <button type="submit" className="form-button" >Delete this Wishlist</button>
                  </form> 
                </div>                                
                <WishlistItem wishlist = {wishlist} handleWishlistItemDelete = {this.props.handleWishlistItemDelete}/>                         
              </div>
            );
          })
          : <div id="loader-back"><center><div class="loader" /></center></div>
          }                    
        </div>
      </section></span>
    );
  }
}

export default Wishlist;