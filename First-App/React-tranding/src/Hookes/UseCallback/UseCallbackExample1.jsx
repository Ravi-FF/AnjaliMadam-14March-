import React, { useCallback, useState } from 'react'
import UsecallbackCompo from './UsecallbackCompo'
import UseCallbackEx2 from './UseCallbackEx2'

export default function UseCallbackExample1() {
    const [count, setCount] = useState(0)
    const [mylist, setList] = useState([])

    const addRecord = useCallback(() => {
        setList([...mylist, "New Record"])
    }, [mylist])

    // const addRecord = () => {
    //     setList([...mylist, "New Record"])
    // }
    return (
        <div>
            <h1>{count}</h1>
            <UsecallbackCompo></UsecallbackCompo>
            <button onClick={() => setCount(count + 1)}>Count</button>
            <UseCallbackEx2 mylist={mylist} addRecord={addRecord }  ></UseCallbackEx2>
        </div>
    )
}
