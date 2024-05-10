import React from 'react'

export default function ChildComponent7({ dataSend }) {
    return (
        <div>
            {dataSend.map((item, index) => {
                return <div key={index}>
                    <h3>{item.id}</h3>
                    <h3 >{item.name}</h3>
                    <h3>{item.subject}</h3>
                </div>
            })}
        </div>
    )
}
