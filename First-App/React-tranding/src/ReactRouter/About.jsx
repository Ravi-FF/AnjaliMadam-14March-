import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div>
            <h1>About Page</h1>
            <div><Link to={"/home"}>Click here to go home Page</Link></div>
            <Link to={"/blog"}>Click here to go blog Page</Link>
        </div>
    )
}
