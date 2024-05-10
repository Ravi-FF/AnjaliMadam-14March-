import React from 'react'

export default function DataShow({ myData }) {
    return (
        <table style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse", border: "1px solid black" }}>
            <thead>
                <tr>
                    <th style={{ padding: "5px", borderCollapse: "collapse", border: "2px solid black" }}>Id</th>
                    <th style={{ padding: "5px", borderCollapse: "collapse", border: "2px solid black" }}>Name</th>
                    <th style={{ padding: "5px", borderCollapse: "collapse", border: "2px solid black" }}>Subject</th>
                </tr>
            </thead>
            <tbody>
                {myData.map((item, index) => {
                    return <tr key={index}>
                        <td style={{ padding: "5px", borderCollapse: "collapse", border: "2px solid black" }}>{item.id}</td>
                        <td style={{ padding: "5px", borderCollapse: "collapse", border: "2px solid black" }}>{item.name}</td>
                        <td style={{ padding: "5px", borderCollapse: "collapse", border: "2px solid black" }}>{item.subject}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}
