import React, { useState } from 'react'

export default function Accordion({ Data, complete }) {
    const [show, setShow] = useState(true)

    return (
        <div className='accordion'>
            <div>
                <button className={show ? 'accordion-btn' : ""} onClick={() => setShow(true)}>Pending</button>
                <button className={show ? "" : 'accordion-btn'} onClick={() => setShow(false)}>Completed</button>
                {show ? <table width={"100%"} border={1} style={{ marginTop: "10px", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
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
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.priority}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table> : <table width={"100%"} border={1} style={{ marginTop: "10px", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complete.length === 0 ? (
                            <tr>
                                <td colSpan={7}>
                                    <h4 style={{ padding: "5px 0", color: "red" }}>No Data Found</h4>
                                </td>
                            </tr>
                        ) : (
                            complete.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.priority}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}
