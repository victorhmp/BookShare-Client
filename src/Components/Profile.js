import React from 'react';
import axios from 'axios';
import Gravatar from 'react-gravatar';

import Auth from '../Modules/Auth';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      name: null,
      location: null,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/profile', {
      headers: {
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response);
      this.setState({
        username: response.data.user.username,
        email: response.data.user.email,
        name: response.data.user.name
      })
    }).catch((err) => console.log(err));
  }

  render() {
    return(
      <section className="profile-container">
        <div className="profile__card">
          <div className="profile__title">
            <h1>{this.state.username ? this.state.username : "User Profile"}</h1>
          </div>
          <div className="profile__gravatar">
            <Gravatar email={this.state.email} size={300} className="profile__gravatar"/>
          </div>
          <div className="profile__info">
            <p><span className="email">Email: </span>{this.state.email}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;