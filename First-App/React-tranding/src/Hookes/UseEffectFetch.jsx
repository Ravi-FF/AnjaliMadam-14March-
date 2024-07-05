import React, { useEffect, useState } from 'react'

export default function UseEffectFetch() {
    const [fetchDatar, setFetch] = useState([])
    useEffect(() => {
        fatchData()
    }, [])
    const fatchData = async () => {
        const data = await fetch("https://reqres.in/api/users?page=2");
        const res = await data.json()
        setFetch(res.data)
    }
    return (
        <div>
            {console.log(fetchDatar)}
            {!fetchDatar.length == 0 ?
                fetchDatar.map((e, i) => {
                    return <div>
                        <p key={i}>{e.id}</p>
                        <p>{e.email}</p>
                        <p>{e.first_name}</p>
                        <p>{e.last_name}</p>
                        <img src={e.avatar} alt="" />
                    </div>
                })
                : "Data Loading.....!"}
        </div>
    )
}
