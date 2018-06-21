import React from 'react';
//import axios from 'axios';

//import Auth from '../Modules/Auth';
class WishlistUpdate extends React.Component {
    constructor(){
      super();
      this.id = null;
      this.state = {     
        name: '',
        description: '', 
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

    render(){       
      /*if(!this.state.wishlistLoaded){
        return false;
      }*/
      return(
        <section id="header">
          <div className="section-wrapper-form">
            <span className="wishlist-title">Update Wishlist</span>
              <form className="wishlist-form" onSubmit={(e) => this.props.handleWishlistUpdate(e, this.state, this.id)}>
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <input
                  className="input"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <div className="button-container">
                  <button className="form-button">Update!</button>                            
                </div>
              </form>
            );
            })
            : <p>Loading...</p>
            }
          </div>
        </section>     
      )      
    }
}

export default WishlistUpdate;