import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';

class WishlistItem extends React.Component{
  constructor(){
    super();
    this.state = {
      myItem: null,
      itemListLoaded: null,
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/wishlist_items/wishlist/' + this.props.wishlist.id, {
      headers:{
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
    console.log(this.props.wishlist.id);
      this.setState({
        myItem: response.data,
        itemListLoaded: true
      })
    }).catch((err) => console.log(err));
  }

  render(){
    return(
      <section id="itemList">
        <div className="section-wrapper">
          {(this.state.itemListLoaded)
          ? this.state.myItem.map(itm => {
            return(
                <div key={itm.id}>                  
                  <li>
                    <p>Livro: {itm.book_title}</p>
                    <p>Autor: {itm.book_author}</p>
                    <p>Editora: {itm.book_publication}</p>
                  </li>
                </div>
            );
          })
          : <p>Loading...</p>
          }
        </div>
      </section>
    )
  }
}

export default WishlistItem;