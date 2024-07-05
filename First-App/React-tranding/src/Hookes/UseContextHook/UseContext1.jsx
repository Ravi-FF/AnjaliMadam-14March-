/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react'
// import UseExample2 from './UseExample2.jsx';
// import UseExample3 from './UseExample3';
import UseContextExample3 from './UseContextExample3.jsx';

export const userContext = createContext();

export default function UseExample1() {
    const [data, setData] = useState("");
    return (
        <div>
            <h3>1st componnet</h3>
            <input type='text' placeholder='Enter data' onChange={(e) => setData(e.target.value)} />

            <userContext.Provider value={data}>
                <UseContextExample3 />
            </userContext.Provider>

        </div>
    )
}