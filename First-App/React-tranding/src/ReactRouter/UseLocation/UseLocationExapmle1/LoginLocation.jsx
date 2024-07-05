import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginLocation() {
    return (
        <div>
            <h1>LoginLocation</h1>
            <Link to="/locationPage">
                <button>Go to location page</button>
            </Link>
        </div>
    )
}
