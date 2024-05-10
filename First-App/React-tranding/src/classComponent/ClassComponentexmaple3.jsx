import React, { Component } from 'react'

export default class ClassComponentexmaple3 extends Component {
    constructor() {
        super()
        this.state = {
            bg: false
        }
    }
    changeBg = () => {
        this.setState({ bg: !this.state.bg })
    }
    render() {
        return (
            <div>
                <div style={{ height: "100px", width: "100px", border: "2px solid blue", background: this.state.bg ? "red" : "blue" }}></div>
                <button onClick={this.changeBg}>Click</button>
            </div>
        )
    }
}
