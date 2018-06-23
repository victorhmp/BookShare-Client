import React from 'react';
import { Redirect } from 'react-router-dom';

class WishlistItemUpdate extends React.Component {
    constructor(){
      super();
      this.id = null;
      this.state = {
        book_title: '',
        book_author: '',
        book_publication: '',
        wishlist_id: null,
        submitted: false,
      }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
      const name = e.target.name;
      const val = e.target.value;
      this.setState({
        [name]: val,
      });
    }

    formSubmit(e) {
      e.preventDefault();
      this.setState({ submitted: true });
    }

    render(){     
      this.state.wishlist_id = this.props.match.match.params.wishlistId;        
      this.id = this.props.match.match.params.wishlistItemId;
      const { submitted } = this.state;   
      return(
        <section id="header">
          <div className="section-wrapper-form">
            <span className="wishlist-title">Update Wishlist Item</span>
            <form className="wishlist-form" onSubmit={(e) => { this.props.handleWishlistItemUpdate(e, this.state, this.id); this.formSubmit(e) }}>
              <input
                className="input"
                type="text"
                name="book_title"
                placeholder="Title"
                value={this.state.book_title}
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="text"
                name="book_author"
                placeholder="Author"
                value={this.state.book_author}
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="text"
                name="book_publication"
                placeholder="Publishing Company"
                value={this.state.book_publication}
                onChange={this.handleChange}
              />
              <div className="button-container">
                <button type="submit" className="form-button">Update Item!</button>                 
              </div>
            </form>
            {submitted && (
              <Redirect to="/wishlists" />
            )}
          </div>
        </section>
      );
    }        
}

export default WishlistItemUpdate;