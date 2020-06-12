import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// functional component
// no life cycle methods
// use for display and return jsx
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>
    </tr>
);

// class component
export default class ExercisesList extends Component{
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.exerciseList = this.exerciseList.bind(this);

        this.state = {
            exercises: [],
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(res => {
            this.setState({ exercises: res.data });
        })
        .catch(err => console.log(err));
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/' + id)
        .then(res => {
            console.log(res.data);
            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
        })
        .catch(err => console.log(err));
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise}  key={currentExercise._id}></Exercise>
        });
    }

    render(){
        return(
            <div>
                <h3>Exercies List</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        );
    }
}