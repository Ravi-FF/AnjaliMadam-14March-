import React, { useState } from 'react'
import UseCostom from './UseCostom'

export default function CostomHookEx1() {
    
    const [count,addCount,removeCount] = UseCostom()
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={addCount}>Count + 1</button>
            <button onClick={removeCount}>Count - 1</button>
        </div>
    )
}
