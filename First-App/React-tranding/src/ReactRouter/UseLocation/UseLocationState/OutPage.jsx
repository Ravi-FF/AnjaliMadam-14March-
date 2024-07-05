import React from 'react'
import { useLocation } from 'react-router-dom'

export default function OutPage() {
    const location = useLocation()
    const { data } = location.state
    return (
        <div>
            <h1>this recond is coming form Input page</h1>
            <h5>{data}</h5>
        </div>
    )
}
