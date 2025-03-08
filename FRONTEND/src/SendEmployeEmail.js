import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import './SendEmailPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const SendEmployeEmail = ({handleemppasswordclicked,type}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  const sendEmail = async (email) => {
    const response = await axios.post('http://localhost:5000/api/send-reset-employee-email', { email });
    return response.data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      setSuccessMessage('Password reset link sent to your email!');
      setError('');
    handleemppasswordclicked()
    },
    onError: (error) => {
      setError('Failed to send reset email. Please try again.');
      setSuccessMessage('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-header">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter Employee email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-btn"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmployeEmail;
