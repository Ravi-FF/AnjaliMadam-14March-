import React, { useState } from 'react'

export default function StateTodo() {
    const [value, setValue] = useState([])
    const [arr, setArr] = useState("")
    const [showReverse, setShowReverse] = useState([])
    const [reverse, setReverse] = useState([])
    const [reverseList, setReverseList] = useState('')

    function showResult() {
        setValue([...value, arr]);
        setArr(" ")
    }


    function showList() {
        setReverse([...reverse, reverseList])
        setReverseList("")
    }
    function reverseData() {
        setShowReverse([...reverse].reverse())
    }
    return (
        <div>
            <section className='center'>

                <input type="text" value={arr} placeholder='Enter Here..!' onChange={(event) => setArr(event?.target?.value)} />
                <button onClick={showResult}>Click me</button>
                <div>
                    {value.map((item, index) => {
                        return <h2 key={index} className='todoItem' >{item}</h2>
                    })}
                </div>
            </section>
            <section className='center'>
                <input type="text" value={reverseList} placeholder='Enter Here..!' onChange={(e) => setReverseList(e?.target?.value)} />
                <button onClick={showList}>click</button>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <div style={{ flexBasis: "30%" }}>
                        {reverse.map((item, index) => {
                            return <h3 key={index} className='todoItemReverse' >{item}</h3>
                        })}
                    </div>

                    <button onClick={reverseData}>Reverse Data</button>


                    <div style={{ flexBasis: "30%" }}>
                        {showReverse.map((item, index) => {
                            return <h3 key={index} className='todoItemReverse' >{item}</h3>
                        })}
                    </div>

                </div>
            </section>
        </div>
    )
}
