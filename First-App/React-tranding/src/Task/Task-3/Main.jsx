import React, { useState } from 'react'
import Card from './Card'
import Male from "./img/male.webp"
import Female from "./img/female.png"
export default function Main() {
    const [submit, setSubmit] = useState(false)
    const [first, setFirst] = useState("");
    const [sendfirst, setSendFirst] = useState("");
    const [last, setLast] = useState("");
    const [sendlast, setSendLast] = useState("");
    const [city, setCity] = useState("");
    const [sendcity, setSendCity] = useState("");
    const [email, setEmail] = useState("");
    const [sendemail, setSendEmail] = useState("");
    const [Gender, setGender] = useState("")
    const [sendGender, setSendGender] = useState("")
    function hendalfun(e) {
        e.preventDefault()
        setSubmit(true)
        setSendFirst(first)
        setFirst("")
        setSendLast(last)
        setLast("")
        setSendCity(city)
        setCity("")
        setSendEmail(email)
        setEmail("")
        setSendGender(Gender)
    }
    return (
        <div className="form-wrapper">
            <div className='form-container'>
                <form onSubmit={(e) => hendalfun(e)}>
                    <div className='input-div'><input type="text" placeholder='Enter your Name' required value={first} onChange={(e) => setFirst(e.target.value)} /></div>
                    <div className='input-div'><input type="text" placeholder='Enter your LastName' required value={last} onChange={(e) => setLast(e.target.value)} /></div>
                    <div className='input-div'><input type="text" placeholder='Enter your City' required value={city} onChange={(e) => setCity(e.target.value)} /></div>
                    <div className='input-div'><input type="email" placeholder='Enter your Email' required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className='input-div'>
                        Gender : <input type="radio" id="male" value="Male" name="gender" required onChange={(e) => setGender(e.target.value)} />
                        <label htmlFor="male"> Male </label>
                        <input type="radio" name="gender" id='female' value="Female" required onChange={(e) => setGender(e.target.value)} />
                        <label htmlFor="female"> Female</label>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
            {submit && <Card first={sendfirst} last={sendlast} city={sendcity} email={sendemail} gender={sendGender == "Male" ? Male : Female} />}
        </div >
    )
}
