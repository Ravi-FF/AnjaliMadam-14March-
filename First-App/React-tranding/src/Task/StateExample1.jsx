import React, { useState } from 'react'

export default function StateExample1() {
    // const [username, setUsername] = useState("")
    // const [data, setData] = useState("")
    // const [value1, setvalue1] = useState("")
    // const [value2, setvalue2] = useState("")
    // const [datavalue, setvalue3] = useState("")

    // function getValue() {
    //     setvalue3(value1 + value2)
    // }

    let [number1, setNumber1] = useState("")
    let [number2, setNumber2] = useState("")
    let [result, setResult] = useState("")
    function getresult(e) {
        switch (e) {
            case "+":
                setResult(parseFloat(number1) + parseFloat(number2))
                break;
            case "-":
                setResult(parseFloat(number1) - parseFloat(number2))
                break;
            case "*":
                setResult(parseFloat(number1) * parseFloat(number2))
                break;
            case "/":
                setResult(parseFloat(number1) / parseFloat(number2))
                break;

            default: setResult("invaild Input")
                break;
        }
        setNumber1("")
        setNumber2("")
    }
    return (
        <div>
            <img src="./" alt="" />
            {/* <input type="text" placeholder='Enter your name' value={username} onChange={(e) => setUsername(e.target.value)} />
            <h1>{data}</h1>
            <button onClick={handelEvent}>Click Me</button> */}

            {/* <input type="text" placeholder='enter name' onChange={(e) => setvalue1(e.target.value)} />
            <input type="text" placeholder='enter name' onChange={(e) => setvalue2(e.target.value)} />
            <h1>{datavalue}</h1>
            <button onClick={getValue}>Click me</button> */}

            <input type="number" value={number1} onChange={(e) => { setNumber1(e.target.value) }} />
            <input type="number" value={number2} onChange={(e) => { setNumber2(e.target.value) }} />
            <button value={"+"} onClick={(e) => getresult(e.target.value)}>+</button>
            <button value={"-"} onClick={(e) => getresult(e.target.value)}>-</button>
            <button value={"*"} onClick={(e) => getresult(e.target.value)}>*</button>
            <button value={"/"} onClick={(e) => getresult(e.target.value)}>/</button>
            <h1>{result}</h1>
        </div>
    )
}
