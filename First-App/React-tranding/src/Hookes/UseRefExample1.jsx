import React, { useRef } from 'react'

export default function UseRefExample1() {
    const inputRef = useRef(null)
    const handleFocus = () => {
        inputRef.current.focus()
    }
    return (
        <>
            <input ref={inputRef} type="text" placeholder='Enter your name.....!' />
            <button onClick={handleFocus}>Click me</button>
        </>
    )
}
