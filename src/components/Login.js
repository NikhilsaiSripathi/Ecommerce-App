import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle redirection
import { useAuth } from '../context/AuthContext';  // Access authentication context

const Login = () => {
  const { setAuthState } = useAuth();  // Access auth setter from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Example of simple login logic
    if (username === 'admin' && password === 'admin123') {
      // Set authState for admin
      setAuthState({
        isAuthenticated: true,
        user: { role: 'admin' },
      });
      // Redirect to admin page for admin users
      navigate('/admin');
    } else {
      // Set authState for normal user
      setAuthState({
        isAuthenticated: true,
        user: { role: 'user' },
      });
      // Redirect to home page for normal users
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;