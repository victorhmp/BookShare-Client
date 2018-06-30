import React from 'react';
import axios from 'axios';
import Auth from '../Modules/Auth';
import {Link} from 'react-router-dom';

import placeholder from '../images/placeholder.png'
import OfferCard from './OfferCard';

class AdvertisementCard extends React.Component {
  constructor() {
    super();
    this.state = {
      adv: {
        id: 0,
        book_title: '', 
        book_author: '',
        book_publication: '',
        comment: '', 
        status: 0,
        user: {
          username: ''
        },
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
    }
    this.mounted = false;
    this.closeAdv = this.closeAdv.bind(this);
    this.statusClassName = this.statusClassName.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatStatus = this.formatStatus.bind(this);
  }

  componentDidMount() {
    this.setState({
      adv: this.props.adv
    });
    this.mounted = true;
  }

  formatStatus(status) {
    switch(status) {
      case 'open':
        return 'Aberto'
      case 'closed':
        return 'Fechado'
      default:
        return 'Indefinido'
    }
  }

  statusClassName(status) {
    switch(status) {
      case 'closed':
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

  closeAdv(e) {
    e.preventDefault();
    this.url = 'http://localhost:3000/advertisements/close/';

    axios.post(this.url, JSON.stringify({id: this.state.adv.id, advertisement: this.state.adv}), {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data);
      alert('Anúncio fechado com sucesso');

      this.setState({
        adv: response.data
      });

    }).catch((err) => {
      console.log(err);
      alert('Não foi possível fechar este anúncio. Tente novamente mais tarde.');
    });
  }

  render() {
    const SHOW = 1;
    const MANAGE = 2;
    const ADVERTISEMENT = 2;
    const OFFER = 3;

    switch(this.props.type) {
      case SHOW:
        const OFFER_URL = '/new-offer/' + this.state.adv.id;
        return(
          <div id={this.state.adv.id} className='card card-adv'>
            <img src={placeholder} alt='Imagem do livro anunciado' className="card-adv__book-image" />
            <div className='card-adv__card-info'>
              <h2 className='title'>{this.state.adv.book_title}</h2>
              <p className='author'> <b>Autor:</b> {this.state.adv.book_author}</p>
              <p className='publication'> <b>Editora:</b> {this.state.adv.book_publication}</p>
              <p className='comment'> <b>Comentário do Usuário:</b> {this.state.adv.comment}</p>
            </div>
            <div className='card-adv__right-info'>
              <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.adv.created_at)} </p>
              <p className='username'> <b>Por:</b> {this.state.adv.user.username}</p>
              <Link to={OFFER_URL}>
                <button className="btn btn-blue">Ofertar</button>
              </Link>
            </div>
          </div>
        );
      
      case MANAGE:
        return(
          <div id={this.state.adv.id} className='card card-adv card-slim'>
            <div className='card-adv__card-info'>
              <h2 className='title'>{this.state.adv.book_title}</h2>
              <p className='author'> <b>Autor:</b> {this.state.adv.book_author}</p>
              <p className='publication'> <b>Editora:</b> {this.state.adv.book_publication}</p>
              <p className='comment'> <b>Comentário:</b> {this.state.adv.comment}</p>
              <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.adv.created_at)} </p>
              <p className={this.statusClassName(this.state.adv.status)}> <b>Status:</b> {this.formatStatus(this.state.adv.status)} </p>
              {this.state.adv.status === 'open' ?
                  <button className="btn-lg btn-blue">Editar</button>
                :
                  <button className="btn-lg btn-disabled" disabled>Editar</button>
              }
              {this.state.adv.status === 'open' ?
                <button className="btn btn-blue" onClick={this.closeAdv}>Fechar anúncio</button>
              :
                <button className="btn btn-disabled" disabled>Anúncio fechado</button>
              }
            </div>
            <div className='card-adv__offer-area'>
              {this.mounted ? 
                this.state.adv.offer.map(o => {
                  return (
                    <OfferCard key={o.id} offer={o} type={ADVERTISEMENT}/>
                  );
                })
                :
                <div className="loader" />
              }
            </div>
          </div>
        );

      case OFFER:
        return(
          <div id={this.state.adv.id} className='card card-darker card-adv'>
            <img src={placeholder} alt='Imagem do livro anunciado' className="card-adv__book-image" />
            <div className='card-adv__card-info'>
              <h2 className='title'>{this.state.adv.book_title}</h2>
              <p className='author'> <b>Autor:</b> {this.state.adv.book_author}</p>
              <p className='publication'> <b>Editora:</b> {this.state.adv.book_publication}</p>
              <p className='comment'> <b>Comentário do Usuário:</b> {this.state.adv.comment}</p>
            </div>
            <div className='card-adv__right-info'>
              <p className='created-at'> <b>Criado às:</b> {this.formatDate(this.state.adv.created_at)} </p>
              <p className='username'> <b>Por:</b> {this.state.adv.user.username}</p>
            </div>
          </div>
        );
      
      default:
        return(<div class="loader" />);
    }
  };
}

export default AdvertisementCard;