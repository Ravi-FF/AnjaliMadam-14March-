import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <Link to={"/about"}>Click here to go about Page</Link>
            </div>
            <Link to={"/blog"}>Click here to go blog Page</Link>
        </div>
    )
}
