import React from 'react'
import PizzaPasta from './Componants/PizzaPasta/PizzaPasta'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import TablePage from './Componants/ReactRouter/RouterTask1/TablePage'
import FormPage from './Componants/ReactRouter/RouterTask1/FormPage'
import ProductData from './Componants/ProductApp/ProductData'
import OneDataShow from './Componants/ProductApp/OneDataShow'

export default function App() {
  return (
    <div>
      {/* <FirstPage />  */}
      {/* <PizzaPasta /> */}
      <BrowserRouter>
        <Routes>
          {/* --------------------------------- */}

          {/* <Route path='/' element={<TablePage />}></Route> */}
          {/* <Route path='/FormPage' element={<FormPage></FormPage>}></Route> */}

          {/* --------------------------------- */}

          <Route path='/' element={<ProductData />}></Route>
          <Route path='/Prodoct/:id' element={<OneDataShow />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
