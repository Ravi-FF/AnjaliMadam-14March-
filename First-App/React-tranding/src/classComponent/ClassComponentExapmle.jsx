import React, { Component } from 'react'

export default class ClassComponentExapmle extends Component {
    constructor() {
        super(); //we are calling parent class (componante) constructor
        this.state = {
            number: 100
        }
    }
    render() {
        return (
            <div>
                <h1>number = {this.state.number}</h1>
            </div>
        )
    }
}
