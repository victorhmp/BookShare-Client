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
        const description = e.target.name;
        this.setState({
            [name]: val,
        });
    }
        
}