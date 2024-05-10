import React from 'react'
import { useState } from 'react'

export default function SimpleLocalStorage() {
    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [msg, setMsg] = useState("")
    const handaleSubmit = () => {
        localStorage.setItem(name, subject)
        setMsg("record successfully added")
    }
    return (
        <div>
            <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name....!' />
            <input type="text" onChange={(e) => { setSubject(e.target.value) }} placeholder='Enter subject....!' />
            <button onClick={handaleSubmit}>Submit</button>
            <p>{msg}</p>
        </div>
    )
}
