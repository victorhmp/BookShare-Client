import React from 'react';
import axios from 'axios';
import Auth from '../Modules/Auth';

class TradeCard extends React.Component {
  constructor() {
    super();
    this.state = {
      trade: {
        id: 0,
        status: 0,
        offer_id: 0,
        advertisement_id: 0
      }
    }
    this.mounted = false;
    this.statusClassName = this.statusClassName.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatStatus = this.formatStatus.bind(this);
  }

  componentDidMount() {
    this.setState({
      trade: this.props.trade
    });
    this.mounted = true;
  }

  formatStatus(status) {
    switch(status) {
      case 'pending':
        return 'Pendente'
      case 'done':
        return 'Concluída'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Indefinido'
    }
  }

  statusClassName(status) {
    switch(status) {
      case 'done':
        return 'status accepted'
      case 'cancelled':
        return 'status declined'
      default:
        return 'status'
    }
  }

  formatDate(d) {
    this.date = new Date(d);
    // Sums 3 to hour due to timezone
    // Sums 1 to month because of Javascript implementation (month starts at 0)
    this.formattedDate = 
      (this.date.getHours() + 3)+":"+this.date.getMinutes()+" de "+
      this.date.getDate()+"/"+(this.date.getMonth() + 1)+"/"+this.date.getFullYear();

    return this.formattedDate;
  }

  render() {
    return(
      <div id={this.state.trade.id} className='card card-trade'>
        <div className='card-trade__card-info'>
          <p className='advertisement'> <b>Anúncio:</b> {this.state.trade.advertisement_id}</p>
          <p className='offer'> <b>Oferta:</b> {this.state.trade.offer_id}</p>
          <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.trade.created_at)} </p>
          <p className='updated-at'> <b>Modificado às:</b> {this.formatDate(this.state.trade.updated_at)} </p>
          <p className={this.statusClassName(this.state.trade.status)}>
            <b>Status:</b> {this.formatStatus(this.state.trade.status)}
          </p>
        </div>
      </div>
    );
  };
}

export default TradeCard;