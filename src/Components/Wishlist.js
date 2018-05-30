import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import Auth from '../Modules/Auth';

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
        <NavLink to={"/wishlistsCreate"} exact={true}>New Wishlist</NavLink>
          {(this.state.wishlistsLoaded) 
          ? this.state.myWishlists.map(wishlist => {
            return (
              <div key={wishlist.id}>
                <h1>{wishlist.name}</h1>
                <p>{wishlist.description}</p>
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