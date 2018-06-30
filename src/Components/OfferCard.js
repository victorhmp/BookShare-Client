import React from 'react';
import axios from 'axios';
import Auth from '../Modules/Auth';
import AdvertisementCard from './AdvertisementCard';

class OfferCard extends React.Component {
  constructor() {
    super();
    this.state = {
      offer: {
        id: 0,
        book_title: '', 
        book_author: '',
        book_publication: '',
        comment: '', 
        status: 0,
        user: {
          username: ''
        },
        advertisement: {
          id: 0,
          book_title: '', 
          book_author: '',
          book_publication: '',
          comment: '', 
          status: 0,
          user: {
            username: ''
          },
        },
      }
    }
    this.mounted = false;
    this.buttonMessage = this.buttonMessage.bind(this);
    this.statusClassName = this.statusClassName.bind(this);

    this.formatDate = this.formatDate.bind(this);
    this.formatStatus = this.formatStatus.bind(this);

    this.cancelOffer = this.cancelOffer.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.declineOffer = this.declineOffer.bind(this);
  }

  componentDidMount() {
    this.setState({
      offer: this.props.offer
    });
    this.mounted = true;
  }

  buttonMessage(status) {
    switch(status) {
      case 'accepted':
        return 'Oferta já aceita'
      case 'declined':
        return 'Oferta recusada'
      case 'cancelled':
        return 'Oferta cancelada'
      default:
        return 'Indefinido'
    }
  }

  formatStatus(status) {
    switch(status) {
      case 'pending':
        return 'Pendente'
      case 'accepted':
        return 'Aceito'
      case 'declined':
        return 'Recusado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Indefinido'
    }
  }

  statusClassName(status) {
    switch(status) {
      case 'accepted':
        return 'status accepted'
      case 'cancelled':
        return 'status declined'
      case 'declined':
        return 'status cancelled'
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

  cancelOffer(e) {
    e.preventDefault();
    this.url = 'http://localhost:3000/offers/cancel';
    axios.post(this.url, JSON.stringify({id: this.state.offer.id, offer: this.state.offer}), {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data);
      alert('Oferta cancelada com sucesso!');

      this.setState({
        offer: response.data.offer
      });

    }).catch((err) => {
      console.log(err);
      alert('Não foi possível cancelar sua oferta. Tente novamente mais tarde.');
    });
  }

  acceptOffer(e) {
    e.preventDefault();
    this.url = 'http://localhost:3000/offers/accept';
    axios.post(this.url, JSON.stringify({id: this.state.offer.id, offer: this.state.offer}), {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data);
      alert('Oferta aceita com sucesso!');

      this.setState({
        offer: response.data
      });

    }).catch((err) => {
      console.log(err);
      alert('Não foi possível aceitar esta oferta. Tente novamente mais tarde.');
    });
  }

  declineOffer(e) {
    e.preventDefault();
    this.url = 'http://localhost:3000/offers/decline';
    axios.post(this.url, JSON.stringify({id: this.state.offer.id, offer: this.state.offer}), {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data);
      alert('Oferta rejeitada com sucesso!');

      this.setState({
        offer: response.data.offer
      });

    }).catch((err) => {
      console.log(err);
      alert('Não foi possível rejeitar esta oferta. Tente novamente mais tarde.');
    });
  }

  render() {
    const MANAGE = 1;
    const ADVERTISEMENT = 2;
    const OFFER = 3;

    switch(this.props.type) {
      case MANAGE:
        return(
          <div id={this.state.offer.id} className='card card-offer'>
            <div className='card-offer__card-info'>
              <h2 className='title'>{this.state.offer.book_title}</h2>
              <p className='author'> <b>Autor:</b> {this.state.offer.book_author}</p>
              <p className='publication'> <b>Editora:</b> {this.state.offer.book_publication}</p>
              <p className='comment'> <b>Comentário:</b> {this.state.offer.comment}</p>
              <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.offer.created_at)} </p>
              <p className={this.statusClassName(this.state.offer.status)}>
                <b>Status:</b> {this.formatStatus(this.state.offer.status)}
              </p>
              {this.state.offer.status === 'pending' ? 
                <div className='card-offer__right-info'>
                  <button className="btn btn-blue" onClick={this.cancelOffer}>
                    Cancelar oferta
                  </button>
                </div>
                :
                <div className='card-offer__right-info'>
                  <button className="btn btn-disabled" disabled>{this.buttonMessage(this.state.offer.status)}</button>
                </div>
              }
            </div>
            <div className='card-offer__ad-area'>
              {this.mounted ? 
                <AdvertisementCard adv={this.state.offer.advertisement} type={OFFER}/>
                :
                <div className="loader" />
              }
            </div>
          </div>
        );

      case ADVERTISEMENT:
        return(
          <div id={this.state.offer.id} className='card card-offer'>
            <div className='card-offer__card-info'>
              <h2 className='title'>{this.state.offer.book_title}</h2>
              <p className='author'> <b>Autor:</b> {this.state.offer.book_author}</p>
              <p className='publication'> <b>Editora:</b> {this.state.offer.book_publication}</p>
              <p className='comment'> <b>Comentário:</b> {this.state.offer.comment}</p>
              <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.offer.created_at)} </p>
              <p className={this.statusClassName(this.state.offer.status)}>
                <b>Status:</b> {this.formatStatus(this.state.offer.status)}
              </p>
              {this.state.offer.status === 'pending' ? 
                <div className='card-offer__card-info'>
                  <button className="btn-lg btn-green" onClick={this.acceptOffer}>
                    Aceitar
                  </button>
                  <button className="btn btn-red" onClick={this.declineOffer}>
                    Rejeitar
                  </button>
                </div>
                :
                <div className='card-offer__card-info'>
                  <button className="btn btn-disabled" disabled>{this.buttonMessage(this.state.offer.status)}</button>
                </div>
              }
            </div>
          </div>
        );
      
      default:
        return(<div className="loader" />);
    }
  };
}

export default OfferCard;