import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>LoginPage</h1>
            <button onClick={() => navigate("/BlogNevi",{replace:true})}>Log in</button>
        </div>
    )
}
