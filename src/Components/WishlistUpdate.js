import React from 'react';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';

//import Auth from '../Modules/Auth';
class WishlistUpdate extends React.Component {
    constructor(){
      super();
      this.id = null;
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

    componentWillMount(){
      this.id = this.props.wishlist.match.params.wishlistId;
    }

    /*componentWillMount() {
      axios.get('http://localhost:3000/wishlists/' + this.props.wishlist.match.params.wishlistId, {
        headers: {
          token: Auth.getToken(),
          'Authorization' : `Token ${Auth.getToken()}`,
        }
      }).then((response) => {
        this.setState({
          wishlist: response.data.wishlist,
          wishlistLoaded: true
        })
      }).catch((err) => console.log(err));
    }*/

    formSubmit(e) {
      e.preventDefault();
      this.setState({ submitted: true });
    }

    render(){        
      const { submitted } = this.state;   
      /*if(!this.state.wishlistLoaded){
        return false;
      }*/
      return(
        <section id="header">
          <div className="section-wrapper-form">
            <span className="wishlist-title">Update Wishlist</span>
              <form className="wishlist-form" onSubmit={(e) => { this.props.handleWishlistUpdate(e, this.state, this.id); this.formSubmit(e) }}>
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
                  <button type="submit" className="form-button">Update Wishlist!</button>                            
                </div>
              </form>
              {submitted && (
                <Redirect to="/wishlists" />
              )}
          </div>
        </section>     
      )      
    }
}

export default WishlistUpdate;