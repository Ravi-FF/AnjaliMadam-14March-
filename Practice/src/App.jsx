import React, { useState } from 'react'
import Auth from './Components/Auth/Auth'
import FIles from './Components/FIles'
import Weather from './Components/Weather'
import API_Crud from './Components/Crud/API_Crud'

export default function App() {
  const [data, setData] = useState([])

  const FetchData = async () => {

  }
  return (
    <div>
      {/* <Auth></Auth> */}
      {/* <FIles></FIles> */}
      {/* <Weather></Weather> */}
      {<API_Crud></API_Crud>}
    </div>
  )
}
