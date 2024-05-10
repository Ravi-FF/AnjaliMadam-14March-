import React, { useState } from 'react'

export default function MapCrud() {
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [subject, setSubject] = useState("")
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(null)
    function handleSubmit(e) {
        e.preventDefault()
        let newRecord = { name, city, subject }
        if (update != null) {
            let updateRecord = [...data]
            updateRecord[update] = newRecord
            setData(updateRecord)
            setUpdate(null)
        }
        else {
            setData([...data, newRecord])
        }
        setSubject("")
        setName("")
        setCity("")
    }
    function handleDelete(index) {
        let newData = data
        newData.splice(index, 1)
        setData([...newData])
    }
    function handleEdit(index) {
        let oldData = data[index]
        setName(oldData.name)
        setCity(oldData.city)
        setSubject(oldData.subject)
        setUpdate(index)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' /> <br />
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter your city' /> <br />
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='Enter your subject' /> <br />
                <button type="submit">{update != null ? "update" : "submit"}</button>
            </form>
            <table border={1} width={"80%"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>City</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
                            <td>{item.subject}</td>
                            <td><button onClick={() => handleEdit(index)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>

    )
}
