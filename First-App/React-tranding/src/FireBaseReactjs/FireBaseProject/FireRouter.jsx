import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from './Registration'
import LoginPageProject from './LoginPageProject'
import ProfilePro from './ProfilePro'
import DeshboardPage from './DeshboardPage'
import EditPagePro from './EditPagePro'
import AddNewPost from './AddNewPost'
import ViewAllUsersPro from './ViewAllUsersPro'
import AdminLoginPage from './AdminLoginPage'
import AllUser from './AllUser'
import ChatScreen from './ChatScreen'

export default function FireRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Registration></Registration>}></Route>
                <Route path='/loginPage' element={<LoginPageProject></LoginPageProject>}></Route>
                <Route path='/AdminLogin' element={<AdminLoginPage></AdminLoginPage>}></Route>
                <Route path='/Profile' element={<ProfilePro></ProfilePro>}></Route>
                <Route path='/DeshboardPage' element={<DeshboardPage></DeshboardPage>}></Route>
                <Route path='/EditPageProject/:uid' element={<EditPagePro></EditPagePro>}></Route>
                <Route path='/AddNewPost' element={<AddNewPost></AddNewPost>}></Route>
                <Route path='/ViewAlluserpost' element={<ViewAllUsersPro></ViewAllUsersPro>}></Route>
                <Route path='/allGuestUser' element={<AllUser></AllUser>}></Route>
                <Route path='/ChatScreen/:uid' element={<ChatScreen></ChatScreen>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
