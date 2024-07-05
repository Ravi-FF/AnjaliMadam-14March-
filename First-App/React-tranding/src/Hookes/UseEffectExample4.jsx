import React, { useState } from 'react'
import { useEffect } from 'react'

export default function UseEffectExample4() {
    const [data, setData] = useState("")

    useEffect(() => {
        fatchData()
    }, [])
    const fatchData = async () => {
        const Response = await fetch("https://jsonplaceholder.typicode.com/users")
        const finalData = await Response.json()
        setData(finalData)
    }
    return (
        <div>
            {data ? data.map((e, i) => {
                return <h1>{e.name}</h1>
            }) : "loading...."}
        </div>
    )
}
