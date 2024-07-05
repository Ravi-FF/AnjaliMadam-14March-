import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function InputPage() {
    const [data, setData] = useState("")
    const navigate = useNavigate()
    return (
        <div>
            <input value={data} onChange={(e) => setData(e.target.value)} type="text" placeholder='enter Your Name' />
            <button onClick={() => navigate("/output", { state: { data } })}>Sent recond</button>
        </div>
    )
}
