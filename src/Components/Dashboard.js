import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';

class Dashboard extends React.Component {
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
      <div>
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
    );
  }
}

export default Dashboard;