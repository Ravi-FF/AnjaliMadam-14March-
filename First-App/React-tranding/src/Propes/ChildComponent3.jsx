import React from 'react'

export default function ChildComponent3(propes) {
    return (
        <div>
            <button onClick={propes.myfun}>Click me - i am Child component</button>
        </div>
    )
}
