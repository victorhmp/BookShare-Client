import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';
import CardAdvertisement from './CardAdvertisement';

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
          <div className="button-container">
            <button className="btn-lg btn-orange">Anunciar livro</button>
          </div>
          {(this.state.feedLoaded) 
          ? this.state.myFeed.map(adv => {
            return (
              <CardAdvertisement key={adv.id} adv={adv} />
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