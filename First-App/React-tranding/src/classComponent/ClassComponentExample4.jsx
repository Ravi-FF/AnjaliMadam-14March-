import React, { Component } from 'react'

export default class ClassComponentExample4 extends Component {
    constructor() {
        super();
        this.state = {
            "Isvisible": true
        }
    }
    handleButton = () => {
        this.setState({ "Isvisible": !this.state.Isvisible })
        }
    render() {
        return (
            <div>
                {this.state.Isvisible ? <h1>Hello</h1> : <h1>Hii</h1>}
                <button onClick={this.handleButton}>Click me</button>
            </div>
        )
    }
}
