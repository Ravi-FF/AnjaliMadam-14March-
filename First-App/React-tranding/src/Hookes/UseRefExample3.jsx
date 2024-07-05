import React, { useRef } from 'react'

export default function UseRefExample3() {
    const name = useRef("")
    const city = useRef("")
    function handleValue() {
        let nameRef = name.current.value
        let ciryRef = city.current.value
        alert(`name: ${nameRef} , city : ${ciryRef}`)
    }
    return (
        <div>
            <input ref={name} type="text" placeholder='Enter your Name' name="" id="" />
            <input ref={city} type="text" placeholder='Enter your city' name="" id="" />
            <button onClick={handleValue}>Click me</button>
        </div>
    )
}
