import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AboutNevi() {
    let navigate = useNavigate()
    return (
        <div><h1>AboutNevi</h1>
            <button onClick={() => navigate("/blogNevi")}>go to blog Nevi</button>
            <button onClick={() => navigate("/")}>go to home Nevi</button>
        </div>
    )
}
