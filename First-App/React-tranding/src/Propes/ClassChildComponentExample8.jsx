import React, { Component } from 'react'

export default class ClassChildComponentExample8 extends Component {
    render() {
        const { subject, number } = this.props
        return (
            <div>
                <h1>{subject}</h1>
                <h1>{number}</h1>
            </div>
        )
    }
}
