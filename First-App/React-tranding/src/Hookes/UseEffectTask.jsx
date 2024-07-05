import React, { useEffect, useState } from 'react'
import "../App.css"
export default function UseEffectTask() {
    const [bg, setBg] = useState("")


    useEffect(() => {
        document.body.style.backgroundColor = bg;
    }, [bg]);

    return (
        <div>
            <button onClick={() => setBg("red")}>Click for RED bg</button>
            <button onClick={() => setBg("Orange")}>Click for ORANGE bg</button>
            <button onClick={() => setBg("navy")}>Click for NAVY bg</button>
        </div>
    )
}
