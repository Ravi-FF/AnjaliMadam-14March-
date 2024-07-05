import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeNevi() {
    const nevigator = useNavigate()
    return (
        <div>
            <h1>HomeNevi</h1>
            <button onClick={()=>nevigator("/blogNevi")}>go to blog Nevi</button>
            <button onClick={()=>nevigator("/aboutNevi")}>go to about Nevi</button>
        </div>
    )
}
