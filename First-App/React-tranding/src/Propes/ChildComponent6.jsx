import React from 'react'

export default function ChildComponent6({ myLanguage }) {
    return (
        <div>
            {myLanguage.map((item, index) => {
                return <h3 key={index}>{item}</h3>
            })}
        </div>
    )
}
