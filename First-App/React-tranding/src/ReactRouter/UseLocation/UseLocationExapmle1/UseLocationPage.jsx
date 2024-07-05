import React from 'react'
import { useLocation } from 'react-router-dom'

export default function UseLocationPage() {
    const Location = useLocation()
    return (
        <div>
            <h2>UseLocationPage</h2>
            <h3>{location.pathname}</h3>
            <h3>{location.search}</h3>
            <h3>{location.hash}</h3>
        </div>
    )
}
