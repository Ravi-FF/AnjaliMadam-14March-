import React, { useState } from 'react'
import UseContextExample2 from './UseContextExample2'

export default function UseContextExample1() {
  const [data, setData] = useState("")
  return (
    <div>
      <input type="text" onChange={(e) => setData(e.target.value)} placeholder='enter your Data........!' />
      <UseContextExample2 data={data} />
    </div>
  )
}
