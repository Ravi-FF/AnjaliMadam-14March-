import React, { useState } from 'react'
import "./Style.css"
import TablePage from './TablePage'
export default function FirstPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [record, setRecord] = useState([])
  const [update, setUpdate] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    let myRecord = { title, description, priority, complete: false }
    if (title == "" || description == "" || priority == "") {
      alert("Please fill All Data....!");
      return
    }
    let filterData = record.filter((item, i) => title == item.name || description == item.description);
    if (filterData.length != 0) {
      alert("Value is Already Exists...!")
      setTitle("")
      setDescription("")
      setPriority("")
    } else {
      if (update != null) {
        let oldData = [...record]
        oldData[update] = myRecord
        setRecord(oldData)
        setUpdate(null)
      } else {
        setRecord([...record, myRecord])
      }
      setTitle("")
      setDescription("")
      setPriority("")
    }
  }
  const handleDelete = (index) => {
    let previousData = [...record]
    previousData.splice(index, 1)
    setRecord(previousData)
  }
  const handleEdit = (index) => {
    let EditedData = record[index]
    setTitle(EditedData.title)
    setDescription(EditedData.description)
    setPriority(EditedData.priority)
    setUpdate(index)
  }
  return (
    <div className='Task-Container'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Add Task</h1>
        <div className='input-boxes'>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Your Title........!' />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Your Description.....!' />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option hidden >priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <button type='submit' className='btn'>{update === null ? "Add Task" : "Update"}</button>
        </div>
      </form>
      <TablePage Data={record} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  )
}
