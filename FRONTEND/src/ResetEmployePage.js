
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPasswordPage.css';

const ResetEmployePage = ({ handleloginclicked }) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetPassword = async (data) => {
    const response = await axios.post('http://localhost:5000/api/change-employee-password', {
      token,
      password: password,
    });
    return response.data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccessMessage('Password has been successfully reset!');
      setError('');
      handleloginclicked();
   
    },
    onError: (error) => {
      console.log(error);
      setError('Failed to reset password. Please try again.');
      setSuccessMessage('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ token, password });
  };

  useEffect(() => {
    if (!token) {
      setError('Invalid token!');
    }
  }, [token]);

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2 className="form-title">Reset Employee Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="token" className="input-label">Code</label>
            <input
              type="token"
              id="token"
              placeholder='Enter your code'
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter your new employee password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-btn"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetEmployePage;
