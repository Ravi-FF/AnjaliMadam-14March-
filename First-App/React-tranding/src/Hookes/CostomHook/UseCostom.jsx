import React, { useState } from 'react'

export default function UseCostom() {
    const [count, setCount] = useState(0)
    const addCount = () => {
        setCount(count + 1)
    }
    const removeCount = () => {
        setCount(count - 1)
    }
    return [count,addCount,removeCount]
}
