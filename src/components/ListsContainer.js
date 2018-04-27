import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import NewListForm from './NewListForm';

class ListsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: []
        }
        this.addNewList = this.addNewList.bind(this)
    }
    componentDidMount() {
        axios.get('http://localhost:3000/api/v1/lists.json')
            .then(response => {
                console.log(response)
                this.setState({
                    lists: response.data
                })
            })
            .catch(error => console.log(error))
    }
    addNewList(title, excerpt) {
        axios.post('http://localhost:3000/api/v1/lists', { list: { title, excerpt } })
            .then(response => {
                console.log(response)
                const lists = [...this.state.lists, response.data]
                this.setState({ lists })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div className="lists-container">
                <NewListForm onNewList={this.addNewList} />
            </div>
        )
    }
}
export default ListsContainer;