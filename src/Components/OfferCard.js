import React from 'react';
import axios from 'axios';
import Auth from '../Modules/Auth';

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
        }
      }
    }
    this.confirmCancel = this.confirmCancel.bind(this);
    this.cancelOffer = this.cancelOffer.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatStatus = this.formatStatus.bind(this);
  }

  componentDidMount() {
    this.setState({
      offer: this.props.offer
    });
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

  formatDate(d) {
    this.date = new Date(d);
    // Sums 3 to hour due to timezone
    // Sums 1 to month because of Javascript implementation (month starts at 0)
    this.formattedDate = 
      (this.date.getHours() + 3)+":"+this.date.getMinutes()+" de "+
      this.date.getDate()+"/"+(this.date.getMonth() + 1)+"/"+this.date.getFullYear();

    return this.formattedDate;
  }

  confirmCancel(e) {
    if(window.confirm('Deseja cancelar oferta? O outro usuário não poderá mais aceitar sua oferta caso seja cancelada.'))
      this.cancelOffer;
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

  render() {
    const MANAGE = 1;

    switch(this.props.type) {
      case MANAGE:
        return(
          <div id={this.state.offer.id} className='card-adv'>
            <div className='card-adv__card-info row'>
              <h2 className='title'>{this.state.offer.book_title}</h2>
              <p className='author'> <b>Autor:</b> {this.state.offer.book_author}</p>
              <p className='publication'> <b>Editora:</b> {this.state.offer.book_publication}</p>
              <p className='comment'> <b>Comentário:</b> {this.state.offer.comment}</p>
              <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.offer.created_at)} </p>
              <p className='status'> <b>Status:</b> {this.formatStatus(this.state.offer.status)} </p>
                {this.state.offer.status === 'pending' ? 
                  <div className='card-adv__right-info'>
                    <button className="btn btn-blue" onClick={this.confirmCancel}>
                      Cancelar oferta
                    </button>
                  </div>
                  :
                  <div className='card-adv__right-info'>
                    <button className="btn btn-disabled" disabled>Oferta cancelada</button>
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