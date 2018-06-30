import React from 'react';
import axios from 'axios';

import Auth from '../Modules/Auth';

import TradeCard from './TradeCard';

class Trade extends React.Component {
  constructor() {
    super();
    this.state = {
      myOfferTrades: null,
      myAdvertisementTrades: null,
      dataLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/trades/user/my', {
      headers: {
        token: Auth.getToken(),
        'Authorization' : `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        myOfferTrades: response.data.tradeOffer,
        myAdvertisementTrades: response.data.tradeAdvertisement,
        dataLoaded: true
      })
    }).catch((err) => console.log(err));
  }

  render() {
    return (
      <section id="my-offers">
        <div className="section-wrapper">
          {(this.state.dataLoaded) 
          ? this.state.myOfferTrades.map(t => {
            return (
              <TradeCard key={t.id} trade={t}/>
            );
          })
          : <div className="loader" />
          }
        </div>
      </section>
    );
  }
}

export default Trade;