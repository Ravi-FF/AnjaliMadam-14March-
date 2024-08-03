// import { data } from 'autoprefixer'
import React, { useState } from 'react'

export default function FirstPage() {
    const [textField, setTextField] = useState("")
    const [resultData, setResultData] = useState("")

    function handleValue(data) {
        if (textField == "") {
            alert("Please Type Your Text..!")
        } else {
            setResultData(data)
        }
    }
    function handleCapitalize() {
        const capitalizedText = textField.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
        handleValue(capitalizedText);
    }
    function handleReset() {
        setResultData("")
        setTextField("")
    }
    return (
        <div className='bg-slate-200 h-screen grid md:grid-cols-2 grid-cols-1 gap-4 p-5'>
            <div className="word-main flex flex-col items-center">
                <textarea value={textField} onChange={(e) => setTextField(e.target.value)} className='w-full rounded-md p-3 border border-slate-700 shadow focus:outline-none' rows={4} placeholder='Enter text here.....!'></textarea>
                <div className="buttons flex gap-2 flex-wrap mt-2">
                    <button className='rounded-md py-1 px-4 text-[16px] bg-cyan-950 text-white border border-slate-700 duration-200  hover:bg-cyan-600 hover:shadow' onClick={() => handleValue(textField.trim().toUpperCase())}>UpperCase</button>
                    <button className='rounded-md py-1 px-4 text-[16px] bg-cyan-950 text-white border border-slate-700 duration-200  hover:bg-cyan-600 hover:shadow' onClick={() => handleValue(textField.trim().toLowerCase())}>LowerCase</button>
                    <button className='rounded-md py-1 px-4 text-[16px] bg-cyan-950 text-white border border-slate-700 duration-200  hover:bg-cyan-600 hover:shadow' onClick={() => handleCapitalize()}>Capitalize</button>
                    <button className='rounded-md py-1 px-4 text-[16px] bg-cyan-950 text-white border border-slate-700 duration-200  hover:bg-cyan-600 hover:shadow' onClick={() => handleValue(textField.trim().length)}>Character</button>
                    <button className='rounded-md py-1 px-4 text-[16px] bg-cyan-950 text-white border border-slate-700 duration-200  hover:bg-cyan-600 hover:shadow' onClick={() => handleValue(textField.trim().match(/\S+/g).length)}>Word</button>
                    <button className='rounded-md py-1 px-4 text-[16px] bg-cyan-950 text-white border border-slate-700 duration-200  hover:bg-cyan-600 hover:shadow' onClick={() => handleValue(textField.trim().split(" ").reverse().join(" "))}>Reverse</button>
                    <button className='rounded-md py-1 px-4 text-[16px] bg-red-600 text-white border border-slate-700 duration-200  hover:bg-red-700 hover:shadow' onClick={() => handleReset()}>Reset</button>
                </div>

            </div>
            <div className="showResult">
                {textField == "" ? <h1 className='text-[20px] font-serif font-semibold'>Please Type Inside TextArea.......!</h1> : <h1 className='text-[20px] font-serif font-semibold'>{resultData}</h1>}
            </div>
        </div>
    )
}
