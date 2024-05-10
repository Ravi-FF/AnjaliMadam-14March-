import React, { useState } from 'react'
import DataShow from './DataShow'

export default function UserData() {
    let [userData, setUserData] = useState([])
    const [Stateid, setID] = useState("")
    const [Statename, setName] = useState("")
    const [Statesubject, setSubject] = useState("")
    function handalData(event) {
        event.preventDefault()
        let allData = [...userData, { id: Stateid, name: Statename, subject: Statesubject }]
        setUserData(allData)
        setID("")
        setName("")
        setSubject("")
    }
    return (
        <div style={{ textAlign: "center" }}>
            <form onSubmit={handalData}>
                <div><input type="number" style={{ margin: "5px 0" }} value={Stateid} required placeholder='Enter your id......!' onChange={(e) => setID(e.target.value)} /></div>
                <div><input type="text" style={{ margin: "5px 0" }} value={Statename} required placeholder='Enter your Name......!' onChange={(e) => setName(e.target.value)} /></div>
                <div><input type="text" style={{ margin: "5px 0" }} value={Statesubject} required placeholder='Enter your Subject......!' onChange={(e) => setSubject(e.target.value)} /></div>
                <div><button type='submit'>ShowData</button></div>
            </form>
            {userData.length != 0 && <DataShow myData={userData}></DataShow>}

        </div>
    )
}
