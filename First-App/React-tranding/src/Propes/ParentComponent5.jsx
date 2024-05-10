import React from 'react'
import ChilComponent5 from './ChildComponent5'

export default function ParentComponent5() {
    return (
        <div>
            <ChilComponent5 subject="React Js" />
            <ChilComponent5 />
        </div>
    )
}
