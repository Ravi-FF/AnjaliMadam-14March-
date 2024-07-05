import React, { Component } from 'react'

export default class UseClassRefExample3 extends Component {
    constructor() {
        super()
        this.inputRef = React.createRef()
    }
    handleButton = () => {
        this.inputRef.current.style.color = "red"
        this.inputRef.current.readOnly = !this.inputRef.current.readOnly
        this.inputRef.current.style.width = "300px"
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.inputRef} placeholder='Enter Your Name......!' />
                <button onClick={this.handleButton}>Click me</button>
            </div>
        )
    }
}
