import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';

import OfferCard from './OfferCard';

class Offer extends React.Component {
  constructor() {
    super();
    this.state = {
      myOffers: null,
      dataLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/offers/user/my', {
      headers: {
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        myOffers: response.data,
        dataLoaded: true
      })
    }).catch((err) => console.log(err));
  }

  render() {
    const MANAGE = 1;

    return (
      <section id="my-offers">
        <div className="section-wrapper">
          {(this.state.dataLoaded) 
          ? this.state.myOffers.map(o => {
            return (
              <OfferCard key={o.id} offer={o} type={MANAGE}/>
            );
          })
          : <div className="loader" />
          }
        </div>
      </section>
    );
  }
}

export default Offer;