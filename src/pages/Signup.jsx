import React, { useState } from 'react';
import supabase from '../supabaseClient';
import '../landing.css';

const Signup = ({ onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    const allowedDomains = ['@dubizzle.com.lb', '@olx.com.lb'];
    const emailLower = email.toLowerCase();
    const isValidDomain = allowedDomains.some(domain => emailLower.endsWith(domain));
  
    if (!isValidDomain) {
      setError('❌ Only @dubizzle.com.lb or @olx.com.lb emails are allowed.');
      return;
    }
  
    // ✅ Password validation (minimum 8 characters)
    if (password.length < 8) {
      setError('❌ Password must be at least 8 characters long.');
      return;
    }
  
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (signUpError) {
      console.error('❌ Signup failed:', signUpError.message);
      setError('❌ Signup failed. ' + signUpError.message);
      return;
    }
  
    console.log('✅ Signup success:', data);
    setSuccess('✅ Account created successfully! Please check your email to confirm.');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <div className="header">
        <img src="/olx-logo.png" alt="OLX Logo" className="header-logo" />
      </div>
  
      <div className="login-container">
        <div className="login-card">
          <h1 className="title">Create Account</h1>
  
          <form className="form" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Your Email"
              className="input validate"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-login">Sign Up</button>
          </form>
  
          {error && (
            <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
  
          {success && (
            <div className="success-message" style={{ color: 'green', marginTop: '10px' }}>
              {success}
            </div>
          )}
  
          <p
            style={{ marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onShowLogin}
          >
            🔙 Back to Login
          </p>
        </div>
      </div>
    </div>
  );
  
export default Signup;