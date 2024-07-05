import React from 'react'
import { useParams } from 'react-router-dom'

export default function PeraPage2() {
    const { id } = useParams()
    return (
        <div>
            PeraPage2
            <h1>id:{id}</h1>
        </div>

    )
}
