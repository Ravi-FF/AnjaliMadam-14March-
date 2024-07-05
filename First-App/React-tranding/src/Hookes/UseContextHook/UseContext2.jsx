/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
// import userContext from "./UseExample1.jsx";
import { userContext } from './UseContext1';

export default function UseExample3() {
    const user = useContext(userContext);
    return (
        <div>
            <h1>Hello</h1>
            <h3>{user}</h3>
        </div>
    )
}