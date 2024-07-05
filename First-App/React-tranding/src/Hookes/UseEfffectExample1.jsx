import React, { useEffect, useState } from 'react'

export default function UseEfffectExample1() {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);
    // useEffect with without dependence 
    useEffect(() => {
        console.log("useEffect calling.........");
    }, [])
    return (
        <div>
            <h1>{count}</h1>
            <h1>{num}</h1>
            <button onClick={() => setCount(count + 1)}>Click me for Count </button>
            <button onClick={() => setNum(num + 1)}>Click me for num</button>
        </div>
    )
}
