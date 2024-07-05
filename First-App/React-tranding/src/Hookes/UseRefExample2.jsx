import React, { useEffect, useRef, useState } from 'react'

export default function UseRefExample2() {
    const [count, setCount] = useState(0)
    const preValue = useRef()
    useEffect(() => {
        preValue.current = count
    }, [count])
    return (
        <div>
            <p>Current value: {count}</p>
            <p>Previous value: {preValue.current}</p>
            <button onClick={(() => setCount(count + 1))}>click me</button>
        </div>
    )
}
