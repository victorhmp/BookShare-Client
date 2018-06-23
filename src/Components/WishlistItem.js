import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

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
        <div className="item-section-wrapper">
          {(this.state.itemListLoaded)
          ? this.state.myItem.map(itm => {
            return(
                <div id="item" key={itm.id}>  
                    <p className="itemText"><u>Livro:</u> {itm.book_title}</p>
                    <p className="itemText"><u>Autor:</u> {itm.book_author}</p>
                    <p className="itemText"><u>Editora:</u> {itm.book_publication}</p>
                  <div className="item-button-container">
                  <form onSubmit={(e) => this.props.handleWishlistItemDelete(itm.id)}>
                    <button className="form-button">Delete Item</button>
                  </form>
                  <NavLink to={'/wishlistItemsUpdate/' + this.props.wishlist.id + '/' + itm.id}>
                    <button className="form-button">Update Item</button>
                  </NavLink>    
                  </div>              
                </div>
            );
          })
          : <div id="loader-bg"><center><div class="loader" /></center></div>
          }
        </div>
      </section>
    )
  }
}

export default WishlistItem;