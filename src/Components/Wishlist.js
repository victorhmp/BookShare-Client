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
      <section id="wishlists">
        <div className="section-wrapper">
          <div className="button-container">
            <button className="form-button">
              <NavLink to={"/wishlistsCreate"}>New Wishlist</NavLink>
            </button>            
          </div>  
          {(this.state.wishlistsLoaded) 
          ? this.state.myWishlists.map(wishlist => {
            return (
              <div key={wishlist.id}>
                <h1><Link to={'/wishlistItemsCreate/' + wishlist.id}>{wishlist.name}</Link></h1>
                <p>{wishlist.description}</p>
                <form className="deleteWishlist-form" onSubmit={(e) => this.props.handleWishlistDelete(wishlist.id)}>
                  <button className="deleteWishlist-button">Delete!</button>
                </form> 
                <Link to={'/wishlistsUpdate/' + wishlist.id}>Update!</Link>
                <WishlistItem wishlist = {wishlist} handleWishlistItemDelete = {this.props.handleWishlistItemDelete}/>                
              </div>
            );
          })
          : <p>Loading...</p>
          }                    
        </div>
      </section>
    );
  }
}

export default Wishlist;