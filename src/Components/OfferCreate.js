import React from 'react';
import Auth from '../Modules/Auth';
import axios from 'axios';

class OfferCreate extends React.Component {
  constructor() {
    super();
    this.baseState = {
      book_title: '', 
      book_author: '',
      book_publication: '',
      comment: '',
      advertisement_id: null,
      status: 0
    };

    this.state = this.baseState;
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateOfferSubmit = this.handleCreateOfferSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  clearForm() {
    this.setState(this.baseState);
  }

  checkForm() {
    this.error = false;
    this.error_msg = 'Preencha todos os campos obrigatórios:\n\n';

    if (this.state.book_title === '') {
      this.error_msg += 'Título do Livro\n';
      this.error = true;
    }

    if (this.state.book_author === '') {
      this.error_msg += 'Autor do Livro\n';
      this.error = true;
    }

    if (this.state.book_publication === '') {
      this.error_msg += 'Editora\n';
      this.error = true;
    }

    if (this.error === true) {
      alert(this.error_msg);
      return false;
    }

    return true;
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val,
    });
  }

  handleCreateOfferSubmit(e, data) {
    e.preventDefault();
    if (!this.checkForm()) return;

    axios.post(`http://localhost:3000/offers`, JSON.stringify(data), {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response);
      alert("Oferta feita com sucesso!");
      this.clearForm();
    }).catch(err => {
      console.log(err);
      alert("Erro ao criar oferta. Tente novamente.");
    })
  }

  componentDidMount() {
    this.setState({...this.state, advertisement_id: this.props.match.params.advId});
  }

  render() {
    return (
      <section id="createOfferForm"> 
        <div className="basic-form-wrapper">
          <form className="basic-form" onSubmit={(e) => this.handleCreateOfferSubmit(e, this.state)}>
            <h1 className="basic-form__title">Fazer nova oferta</h1>
            <span className="basic-form__instructions">
              LEMBRE-SE! Você não poderá editar sua oferta posteriormente. Caso queira oferecer outro livro ou corrigir algum dado, faça uma nova oferta.
            </span>
            <span className="basic-form__instructions">
              Os campos com * são obrigatórios.
            </span>

            <input 
              type="text"
              className="basic-form__input"
              name="book_title"
              placeholder="Nome do Livro *"
              value={this.state.book_title}
              onChange={this.handleChange}
            />

            <input 
              type="text"
              className="basic-form__input"
              name="book_author"
              placeholder="Autor do Livro *"
              value={this.state.book_author}
              onChange={this.handleChange}
            />

            <input 
              type="text"
              className="basic-form__input"
              name="book_publication"
              placeholder="Editora do Livro e Edição *"
              value={this.state.book_publication}
              onChange={this.handleChange}
            />

            <textarea 
              type="textarea"
              className="basic-form__textarea"
              name="comment"
              placeholder="Comentário sobre sua oferta"
              value={this.state.comment}
              onChange={this.handleChange}
            />

            <button className="basic-form__btn">Ofertar</button>
          </form>
        </div>
      </section>
    )
  }
}

export default OfferCreate;