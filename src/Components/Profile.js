import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
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
    }).catch((err) => console.log(err));
  }

  render() {
    return(
      <h1>Página de perfil</h1>
    );
  }
}

export default Profile;