import React, { Component } from 'react'

export default class ClassChildComponentExample9 extends Component {
    render() {
        const { myFunction, subject } = this.props
        return (
            <>
                <button onClick={myFunction}>Clicked Here</button>
                <h2>{subject}</h2>
            </>
        )
    }
}
