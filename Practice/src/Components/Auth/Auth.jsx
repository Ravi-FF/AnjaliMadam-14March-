import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { IsAuth } from "./authService";
const Auth = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                <Route
                    path="*"
                    element={IsAuth() ? <Navigate to="/home" /> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Auth;
