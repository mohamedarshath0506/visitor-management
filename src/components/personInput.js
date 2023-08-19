import React, { Component, useEffect, useState } from "react"
import axios from "axios"


//function PersonList() {

export default class PersonInput extends React.Component {

    state = {
       //name: '',
       id: 0
    };

    handleChange = event => {
        this.setState({ id: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            name: this.state.name
        }

        axios
        .post(`http://localhost:3003/visitorHistory`, {user})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Person ID:
                {/* <input type="text" name="name" onChange={this.handleChange} /> */}
                <input type="number" name="id" onChange={this.handleChange} />
            </label>
            <button type="submit">Add</button>
            {/* <button type="submit">Delete</button> */}
        </form>
    )
    }
}