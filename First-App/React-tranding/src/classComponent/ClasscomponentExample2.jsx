import React, { Component } from 'react'

export default class ClasscomponentExample2 extends Component {
    constructor() {
        super()
        this.state = {
            number: 0
        }
    }
    incrementNumber = () => {
        this.setState({ number: this.state.number + 1 })
    }
    decrementNumber = () => {
        this.setState({ number: this.state.number - 1 })
    }
    render() {
        return (
            <div>
                <h1>{this.state.number}</h1>
                <button onClick={this.incrementNumber}>increment</button>
                <button onClick={this.decrementNumber}>dicrement</button>
            </div>
        )
    }
}
