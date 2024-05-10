import React from 'react'
import { useState } from 'react'
import ChildComponent4 from './ChildComponent4'

export default function ParentComponent4() {
    let [value, setValue] = useState(true)
    return (
        <div>
            <button onClick={setValue(!value)}>Click me</button>
            {
                value ? <ChildComponent4 msg="Hello React" /> : "false"
            }
        </div>
    )
}
