import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Function to handle the email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/auth/loginOrSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP. Please try again.');
      }

      setIsOtpSent(true); // Show OTP input field after successful request
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://hammerhead-app-yx4ws.ondigitalocean.app/api/v1/auth/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP. Please try again.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in local storage
      alert('Login successful!'); // Handle successful login
      navigate('/'); // Redirect to the main page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center p-16 md:mx-16 text-[#ffffff] my-10">
      <div className="bg-[#151b23] shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit}>
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-md p-2 w-full mb-4 text-black"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <label htmlFor="otp" className="block text-white mb-2">
              Enter OTP:
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="border rounded-md p-2 w-full mb-4 text-black"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default Login;
