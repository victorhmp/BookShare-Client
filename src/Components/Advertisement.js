import React from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

import Auth from '../Modules/Auth';
import AdvertisementCard from './AdvertisementCard';

class Advertisement extends React.Component {
  constructor() {
    super();
    this.state = {
      myAdv: null,
      dataLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/advertisements/user/my', {
      headers: {
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        myAdv: response.data,
        dataLoaded: true
      })
    }).catch((err) => console.log(err));
  }

  render() {
    const MANAGE = 2;

    return (
      <section id="my-advertisements">
        <div className="section-wrapper">
          <div className="button-container">
            <Link to='/new-advertisement'> <button className="btn-lg btn-orange">Anunciar livro</button> </Link>
          </div>
          {(this.state.dataLoaded) 
          ? this.state.myAdv.map(adv => {
            return (
              <AdvertisementCard key={adv.id} adv={adv} type={MANAGE} />
            );
          })
          : <div className="loader" />
          }
        </div>
      </section>
    );
  }
}

export default Advertisement;