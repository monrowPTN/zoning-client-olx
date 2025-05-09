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
  
    if (password.length < 8) {
      setError(
        <>
          ❌ Signup failed. Your password must include at least one:
          <ul style={{ textAlign: 'left', marginTop: '10px' }}>
            <li>Lowercase letter (a–z)</li>
            <li>Uppercase letter (A–Z)</li>
            <li>Number (0–9)</li>
            <li>Special character (e.g. ! @ # $ % ^ & *)</li>
          </ul>
        </>
      );
      return;
    }
  
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://zoning-client-olx.vercel.app/',
      }
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
    disabled={success !== ''}
  />
  <input
    type="password"
    placeholder="Password"
    className="input"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={success !== ''}
  />
  <button
    type="submit"
    className="btn-login"
    disabled={success !== ''}
    style={{ opacity: success ? 0.6 : 1, cursor: success ? 'not-allowed' : 'pointer' }}
  >
    Sign Up
  </button>
</form>

{error && (
  <div
    className="error-message"
    style={{
      color: '#c0392b',
      backgroundColor: '#fdecea',
      padding: '10px 20px',
      borderRadius: '12px',
      marginTop: '20px',
      fontWeight: '600',
      textAlign: 'center'
    }}
  >
    {typeof error === 'string' ? (
      error
    ) : (
      <>
        <span>❌ Signup failed. Your password must include at least one:</span>
        <ul style={{ textAlign: 'left', marginTop: '10px', fontWeight: '500' }}>
          <li>Lowercase letter (a–z)</li>
          <li>Uppercase letter (A–Z)</li>
          <li>Number (0–9)</li>
          <li>Special character (e.g. ! @ # $ % ^ & *)</li>
        </ul>
      </>
    )}
  </div>
)}

{success && (
  <div style={{
    color: 'green',
    backgroundColor: '#E8F8D8',
    padding: '10px 20px',
    borderRadius: '12px',
    marginTop: '20px',
    fontWeight: '600',
    textAlign: 'center'
  }}>
    ✅ Signup successful! Please check your email to confirm.
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
};

export default Signup;