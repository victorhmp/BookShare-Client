import React from 'react';

class WishlistCreate extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            description: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        });
    }

    render(){
        return(
            <section id="header">
                <div className="section-wrapper-form">
                    <span class="createWishlist-title">Create Wishlist</span>
                    <form class="createWishlist-form" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                        <input
                            class="input"
                            type="text"
                            name="nameWishlist"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <input
                            class="input"
                            type="textarea"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                        <div class="button-container">
                            <button class="form-button">Create!</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }        
}

export default WishlistCreate;