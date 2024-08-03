import React, { useMemo, useState } from 'react'

export default function UseMemoExapmle() {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(10)
    // function doSomething() {
    //     console.warn("---------do something");
    //     return num1 * 10
    // }

    const useData = useMemo(() => {
        console.warn("useMemo");
        return num1 * 10
    },[num1])
    return (
        <div>
            <h3>{num1}</h3>
            {/* <h3>do something :{doSomething()}</h3> */}
            <button onClick={() => setNum1(num1 + 1)}>count + 1</button>

            <h3>{num2}</h3>
            <button onClick={() => setNum2(num2 + 10)}>count + 10</button>
        </div>
    )
}
