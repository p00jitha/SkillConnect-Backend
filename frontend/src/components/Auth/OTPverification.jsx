import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OTPverification = () => {
    const [otp, setOTP] = useState('');
  const email = useSelector((state) => state.auth?.email);
  console.log(email)
  const handleResendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/resendotp', { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verifyotp', {
        email,
        otp,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{color:"white"}}>
       <h2>OTP Verification</h2>
      <form onSubmit={handleOTPSubmit}>
        <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} placeholder="Enter OTP" />
        <button type="submit">Verify OTP</button>
      </form>
      <button onClick={handleResendOTP}>Resend OTP</button>
    </div>
  )
}

export default OTPverification
