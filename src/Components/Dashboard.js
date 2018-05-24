import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      myFeed: null,
      feedLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/advertisements/feed', {
      headers: {
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        myFeed: response.data.feed,
        feedLoaded: true
      })
    }).catch((err) => console.log(err));
  }

  render() {
    return (
      <section id="dashboard">
        <div className="section-wrapper">
          {(this.state.feedLoaded) 
          ? this.state.myFeed.map(adv => {
            return (
              <div key={adv.id}>
                <h1>Livro: {adv.book_title}</h1>
                <p>Autor: {adv.book_author}</p>
                <p>Editora: {adv.book_publication}</p>
                <p>Comentário do Usuário: {adv.comment}</p>
                <p>Por: {adv.user.username}</p>
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

export default Dashboard;