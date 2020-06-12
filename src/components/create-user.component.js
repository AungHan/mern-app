import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        // bind 'this' keyword to class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

     // react life cycle method
    // before page load
    componentDidMount(){
        this.setState({
            username: 'user1'
        });
    }

    // state change handlers
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
        };

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        // reset username 
        this.setState({
            username: ''
        });
        //window.location = "/";
    }

    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Username: </label>
                        <input type="text" 
                               required
                               className="form-control"
                               value={this.state.username}
                                onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" 
                        className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}