import React, { Component } from 'react'

export default class UseRefExapmle1 extends Component {
    constructor(props) {
        super()
        this.inputRef = React.createRef()
    }
    handleValue = () => {
        this.inputRef.current.focus()
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.inputRef} placeholder='Enter Your Name.........!' />
                <button onClick={this.handleValue}>CLick Me</button>
            </div>
        )
    }
}
