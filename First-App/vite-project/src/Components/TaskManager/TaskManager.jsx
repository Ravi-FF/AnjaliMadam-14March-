import React, { useEffect, useState } from 'react';

export default function TaskManager() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState(true);
    const [filterPriority, setFilterPriority] = useState("");
    const [filterbyStatus, setFilterbyStatus] = useState("");
    const [allCheck, setAllCheck] = useState(false)

    let [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = JSON.parse(localStorage.getItem("formData")) || [];
        setData(fetchData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { id: Date.now(), title, description, priority, status };
        const updatedData = [...data, newTask];
        setData(updatedData);
        localStorage.setItem("formData", JSON.stringify(updatedData));
        setTitle("")
        setDescription("")
        setPriority("")
    };


    // delete item 
    const handleDelete = (index) => {
        const updatedData = data.filter((item) => item.id !== index);
        localStorage.setItem("formData", JSON.stringify(updatedData));
        setData(updatedData);
    };

    // priority Filter 
    let filteredData = data.filter(item => filterPriority === "" ? true : item.priority.toLowerCase().includes(filterPriority.toLowerCase()))

    // Status Filter 
    filteredData = filteredData.filter(item => filterbyStatus === "" ? true : item.status === (filterbyStatus === "panding"))

    // allchecked 
    const allChecked = () => {
        const isChecked = data.map((item) => (
            { ...item, status: allCheck }
        ))
        localStorage.setItem("formData", JSON.stringify(isChecked))
        setData(isChecked);
    }

    // oncheck 
    const oneCheck = (id) => {
        const updatedData = data.map(item => {
            if (item.id === id) return { ...item, status: !item.status }; // Toggle status
            return item;
        })
        localStorage.setItem("formData", JSON.stringify(updatedData));
        setData(updatedData);
        const isAllChecked = updatedData.every((item) => !item.status);
        setAllCheck(isAllChecked)
    }

    return (
        <div className='Task_Manager container'>
            <form action="#" onSubmit={handleSubmit}>
                <div className="title">Task Manager</div>
                <div className="user__details">
                    <div className="input__box">
                        <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    </div>
                    <div className="input__box">
                        <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    </div>
                    <div className="input__box">
                        <select required value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="" hidden>Priority</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className="input_box gender__details">
                    <span className="details">Status</span>
                    <input type="radio"
                        checked={status}
                        onChange={(e) => setStatus(e.target.id === 'status')}
                        name='status'
                        id='dot-1' />
                    <div className="category">
                        <label htmlFor="dot-1">
                            <span className="dot one" />
                            <span>Panding</span>
                        </label>
                    </div>
                </div>
                <div className="button">
                    <button type='submit'>Save</button>
                </div>
            </form>
            <div className='filter'>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="">All Data</option>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                </select>

                <select value={filterbyStatus} onChange={(e) => setFilterbyStatus(e.target.value)}>
                    <option value=''>Status</option>
                    <option value='panding'>Pending</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>
                            <input type="checkbox" onChange={(e) => setAllCheck(e.target.checked)} checked={allCheck} onClick={allChecked} name="" id="allCheck" style={{ marginRight: "15px" }} />
                            <label htmlFor="allCheck" style={{ cursor: "pointer" }}>All check</label>
                        </th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr><td colSpan={6}>No Data Found.........!</td></tr>
                    ) : (
                        filteredData.map(({ id, title, description, priority, status }, i) =>
                            <tr key={id}>
                                <td>{i + 1}</td>
                                <td>
                                    <input checked={!status} onChange={() => oneCheck(id)} type="checkbox" name="" id="" />
                                </td>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td>{priority}</td>
                                <td>{status ? "Pending" : "Completed"}</td>
                                <td><button onClick={() => handleDelete(id)}>Delete</button></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
