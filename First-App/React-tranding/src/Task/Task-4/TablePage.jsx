import React, { useState } from 'react';
import Accordion from './Accordion';

export default function TablePage({ Data, handleDelete, handleEdit }) {
    const [complete, setComplete] = useState(Data.map(item => item.complete || false));
    const [completedData, setCompletedData] = useState([]);
    function handleComplete(index) {
        const updatedComplete = [...complete];
        updatedComplete[index] = true;
        setComplete(updatedComplete);
        if (!completedData.includes(Data[index])) {
            setCompletedData([...completedData, Data[index]])
        }
npm    }
    return (
        <>
            <table width={"100%"} border={1}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th colSpan={2}>Action</th>
                        <th>Mark as Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.length === 0 ? (
                        <tr>
                            <td colSpan={7}>
                                <h4 style={{ padding: "5px 0", color: "red" }}>No Data Found</h4>
                            </td>
                        </tr>
                    ) : (
                        Data.map((item, index) => (
                            <tr key={index} className={complete[index] ? "completedData" : ""} >
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.priority}</td>
                                <td><button type="button" disabled={complete[index]} className='btn-edit btn' onClick={() => handleEdit(index)}>Edit</button></td>
                                <td><button type="button" disabled={complete[index]} className='btn-delete btn' onClick={() => handleDelete(index)}>Delete</button></td>
                                <td>
                                    <button type="button" disabled={complete[index]} className='btn-complete btn' onClick={() => handleComplete(index)}>
                                        {complete[index] ? "Completed..!" : "Complete"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Accordion Data={Data} complete={completedData} />
        </>
    );
}
