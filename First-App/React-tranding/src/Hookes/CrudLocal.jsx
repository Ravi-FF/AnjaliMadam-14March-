import React, { useEffect, useState } from 'react'

export default function CrudLocal() {
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [subject, setSubject] = useState("")
    const [student, setStudent] = useState([])
    const [update, setUpdate] = useState(null)
    useEffect(() => {
        let allRecond = JSON.parse(localStorage.getItem("key")) || []
        setStudent(allRecond)
    }, [])

    const handleData = (e) => {
        e.preventDefault()
        if (name == "" || city == "" || subject == "") {
            alert("please Fill data");
            return
        }
        for (const iterator of student) {
            if (iterator.name == name || iterator.city == city || iterator.subject == subject) {
                alert("same Data found");
                setName("")
                setSubject("")
                setCity("")
                return
            }
        }
        let data = { id: Date.now(), name, city, subject }
        if (update != null) {
            let fatchData = [...student]
            fatchData[update] = data
            localStorage.setItem("key", JSON.stringify(fatchData))
            setStudent(fatchData)

            setUpdate(null)
        } else {
            setStudent([...student, data])
            localStorage.setItem("key", JSON.stringify([...student, data]))
        }
        setName("")
        setSubject("")
        setCity("")
    }
    function handleDelete(index) {
        let allRecond = student.filter((e, i) => i !== index)
        setStudent(allRecond)
        localStorage.setItem("key", JSON.stringify(allRecond))
    }
    function handleEdit(index) {
        setUpdate(index)
        setName(student[index].name)
        setCity(student[index].city)
        setSubject(student[index].subject)
    }
    return (
        <div>
            <form onSubmit={handleData}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name...!' /> <br></br>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city.....!' /> <br></br>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='Enter subject.....!' /> <br></br>
                <button type='submit'>{update !== null ? "update" : "submit"}</button>
            </form>
            <table border={2} width={"50%"}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>city</th>
                        <th>subject</th>
                        <th colSpan={2}>action</th>
                    </tr>
                </thead>
                <thead>
                    {student.map((e, i) => {
                        return <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.city}</td>
                            <td>{e.subject}</td>
                            <td><button onClick={() => handleEdit(i)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(i)}>Delete</button></td>
                        </tr>
                    })}
                </thead>
            </table>
        </div>
    )
}
