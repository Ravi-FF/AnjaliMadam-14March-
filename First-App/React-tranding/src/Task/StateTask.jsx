import React, { useState } from 'react'

function StateTask() {
    const [value, setValue] = useState("")
    const [change, setChange] = useState("")
    const [convert, setConvert] = useState("")
    const [Convert, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [month, setmonth] = useState("")
    const [year, setYear] = useState("")
    const [Mymonth, setMymonth] = useState("")
    const [MYday, setMyday] = useState("")

    const handleClick = () => {
        let num = 1;
        for (let i = 1; i <= value; i++) {
            num *= i
        }
        setChange(`factorial of ${value} is ${num.toFixed(1)}`)
    }

    function handelDay() {
        if (convert <= 0 || convert > 12) {
            setDay("invalid data")
        }
        else {
            setDay(`your month is ${convert} and day is : ${+convert * 30}`)
            setConvert("")
        }
    }
    function handelMonth() {
        if (Convert <= 0 || Convert > 365) {
            setmonth("invalid data")
        }
        else {
            setmonth(`your days is ${Convert} and month is : ${+Convert / 30}`)
            setMonth("")
        }
    }
    function totalAns() {
        setMymonth(+year * 30)
        setMyday(+year * 360)
    }
    return (
        <div>
            <section>
                <input type="number" value={value} onChange={(e) => { setValue(e.target.value) }} />
                <h1>{change}</h1>
                <button onClick={handleClick}>Click Me</button>
            </section>
            <section>
                <input type="number" placeholder='enter month here..!' value={convert} onChange={(e) => { setConvert(e.target.value) }} />
                <button onClick={handelDay}>convert</button>
                <h1>{day}</h1>
            </section>

            <section>
                <input type="number" placeholder='enter days here..!' value={Convert} onChange={(e) => { setMonth(e.target.value) }} />
                <button onClick={handelMonth}>convert</button>
                <h1>{month}</h1>
            </section>

            <section>
                <input type="num" placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)} />
                <input type="num" placeholder='month' value={Mymonth} disabled />
                <input type="num" placeholder='day' value={MYday} disabled />
                <button onClick={totalAns}>Get Result</button>
            </section>
        </div>

    )
}

export default StateTask