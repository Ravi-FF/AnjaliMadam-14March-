
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './authService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await loginUser(email, password)
    alert(res.message)
    navigate('/home')
  };

  return (
    <div>
      <p>email: "test.user@gmail.com"</p>
      <p> password: "test.user@123"</p>
      <div className="form_wrapper">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className='password_input'>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "type" : "password"} placeholder='Password' />
            <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "hide" : "show"}</button>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
