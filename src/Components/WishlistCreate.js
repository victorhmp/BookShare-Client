import React from 'react';
import { Redirect } from 'react-router-dom';

class WishlistCreate extends React.Component {
    constructor(){
      super();
      this.state = {
        name: '',
        description: '',
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
      const { submitted } = this.state;

      return(
        <section id="header">
          <div className="section-wrapper-form">
            <span className="wishlist-title">Create a new Wishlist</span>
            <form className="wishlist-form" onSubmit={(e) => { this.props.handleWishlistSubmit(e, this.state); this.formSubmit(e) }}>
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <textarea
                rows="4"
                className="input"
                type="text"
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <div className="button-container">
                <button type="submit" className="form-button">Create Wishlist!</button>
              </div>
            </form>
            {submitted && (
              <Redirect to="/wishlists"/>
            )}
          </div>
        </section>
      );
    }        
}

export default WishlistCreate;