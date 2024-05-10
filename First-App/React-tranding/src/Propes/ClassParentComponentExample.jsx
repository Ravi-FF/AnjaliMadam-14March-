import React, { Component } from 'react'
import ClassChildComponentExample9 from './ClassChildComponentExample9'

export default class ClassParentComponentExample extends Component {
    handleClick = () => {
        alert("function Clicked")
    }
    render() {
        return (
            <ClassChildComponentExample9 myFunction={this.handleClick} subject="React Javascript" />
        )
    }
}
