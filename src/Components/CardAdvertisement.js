import React from 'react';

const CardAdvertisement = (props) => {
    return(
        <div key={props.adv.id} className='card-adv'>
            <h1>Livro: {props.adv.book_title}</h1>
            <p>Autor: {props.adv.book_author}</p>
            <p>Editora: {props.adv.book_publication}</p>
            <p>Comentário do Usuário: {props.adv.comment}</p>
            <p>Por: {props.adv.user.username}</p>
        </div>
    )
};

export default CardAdvertisement;