import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BlogNevi() {
    let navigate = useNavigatete()
    return (
        <div>
            <h1>BlogNevi</h1>
            <button onClick={() => navigate("/aboutNevi")}>go to About Nevi</button>
            <button onClick={() => navigate("/")}>go to home Nevi</button>
        </div>
    )
}
