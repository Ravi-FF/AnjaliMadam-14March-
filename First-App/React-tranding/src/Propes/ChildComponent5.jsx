import React from 'react'

export default function ChildComponent5({ subject }) {
    return (
        <div>
            <h1>{subject}</h1>
        </div>
    )
}
ChildComponent5.defaultProps = {
    subject: "JavaScript"
}
