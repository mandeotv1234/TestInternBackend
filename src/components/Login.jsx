import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {
        username,
        password
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/users');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="avatar"
            className="rounded-circle mb-3"
            width="80"
            height="80"
          />
          <h3 className="fw-bold">Sign In</h3>
          <p className="text-muted">Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center text-muted mt-3" style={{ fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;
