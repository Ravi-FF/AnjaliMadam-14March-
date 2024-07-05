import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import MainRedux from './MainRedux'
import Todo from './Todo'
import FinanceManager from './FinanceManager/FinanceManager'

export default function RouterRedux() {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        {/* <Route path='/' element={<MainRedux></MainRedux>}></Route> */}
                        <Route path='/' Component={Todo}></Route>
                        {/* <Route path='/' Component={FinanceManager}></Route> */}
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    )
}
