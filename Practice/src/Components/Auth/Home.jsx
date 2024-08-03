import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from './authService';
// import { logout } from './authService';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logOutUser()
        navigate("/login")
    };

    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
