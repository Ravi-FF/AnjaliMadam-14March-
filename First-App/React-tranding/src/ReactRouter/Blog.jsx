import React from 'react'
import { Link } from 'react-router-dom'

export default function Blog() {
    return (
        <div>
            <h1>Blog Page</h1>
            <div>
                <Link to={"/home"}>click here to go home page</Link>
            </div>
            <Link to={"/about"}>click here to go about page</Link>
        </div>
    )
}
