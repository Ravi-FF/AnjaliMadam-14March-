import React from 'react'
import ChildComponent3 from './ChildComponent3'

export default function ParentComponent3() {
    const sentdata = () => {
        alert("hello guys...!")
    }
    return (
        <div>
            <button onClick={sentdata}>Click me - i am parent component</button>
            <ChildComponent3 myfun={sentdata}></ChildComponent3>
        </div>
    )
}
