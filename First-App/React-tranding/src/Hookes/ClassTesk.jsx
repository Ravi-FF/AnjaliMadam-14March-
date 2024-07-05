import React, { useEffect, useState } from 'react'

export default function ClassTesk() {
    const [data, setData] = useState(null)
    let [value, setValue] = useState("")

    const fetchData = async () => {
        const Api = await fetch(`https://jsonplaceholder.typicode.com/users/${value}`)
        const response = await Api.json()
        setData(response)
    }
    useEffect(() => {
        !value == "" ? fetchData() : ""
    }, [value])
    
    return (
        <div style={{ paddingLeft: "40px" }}>
            <input type="number" value={value} placeholder='Enter id....!' max={10} onChange={(e) => setValue(e.target.value)} />
            {data == null || value == "" ?
                <h3> no data found........!</h3> :
                <div>
                    {/* {console.log(data.id==value)} */}
                    <p>id : <strong>{data.id}</strong></p>
                    <p>name : <strong>{data.name}</strong></p>
                    <p>username : <strong>{data.username}</strong></p>
                    <p>address : <strong>{data.address.street}</strong></p>
                    <p>suite : <strong>{data.address.suite}</strong></p>
                    <p>city : <strong>{data.address.city}</strong></p>
                    <p>zipcode : <strong>{data.address.zipcode}</strong></p>
                </div>
            }
        </div>
    )
}
