import React from 'react'

export default function Card(Props) {
    return (
        <div className='card-wrapper'>
            <div className='img-box'>
                <img src={Props.gender} alt="" />
            </div>
            <div>First name : <strong>{Props.first}</strong></div>
            <div>Last name : <strong>{Props.last}</strong></div>
            <div>City : <strong>{Props.city}</strong></div>
            <div>Email : <strong>{Props.email}</strong></div>
        </div>
    )
}
 