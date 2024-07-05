import React, { useEffect, useState } from 'react'

export default function UseEffectExample3() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log("UseEffect called");
    }, [])
    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>Click Here....!</button>
        </div>
    )
}
