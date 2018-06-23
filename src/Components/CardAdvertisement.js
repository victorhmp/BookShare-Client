import React from 'react';
import placeholder from '../images/placeholder.png'

const CardAdvertisement = (props) => {
  return(
    <div id={props.adv.id} className='card-adv'>
      <img src={placeholder} alt='Imagem do livro anunciado' className="card-adv__book-image" />
      <div className='card-adv__book-info'>
        <h2 className='title'>{props.adv.book_title}</h2>
        <p className='author'> <b>Autor:</b> {props.adv.book_author}</p>
        <p className='publication'> <b>Editora:</b> {props.adv.book_publication}</p>
        <p className='comment'> <b>Comentário do Usuário:</b> {props.adv.comment}</p>
      </div>
      <div className='card-adv__user-info'>
        <p className='created-at'> <b>Criado às:</b> {props.adv.created_at} </p>
        <p className='username'> <b>Por:</b> {props.adv.user.username}</p>
        <button className="btn btn-blue">Ofertar</button>
      </div>
    </div>
  )
};

export default CardAdvertisement;