
import React, { Component } from 'react'

export default class UseclassRefExample extends Component {
    constructor() {
        super()
        this.nameRef = React.createRef()
    }
    handleSubmit = () => {
        if (this.nameRef.current.value.length < 4) {
            alert("name must be 4 characters required")
        } else {
            this.setState({ name: this.nameRef.current.value })
        }
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.nameRef} placeholder='Enter Your Name........!' />
                <button onClick={this.handleSubmit} >Submit Form</button>
            </div>
        )
    }
}
