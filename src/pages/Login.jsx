import '../landing.css';
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const Login = ({ onLoginSuccess, onShowSignup }) => { // ✅ Accept onShowSignup as prop
  const [showMessage, setShowMessage] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowMessage(false);
    setError('');

    // ✅ Correct domain check (cleaned & enforced)
    const allowedDomains = ['@dubizzle.com.lb', '@olx.com.lb'];
    const emailLower = userIdentifier.toLowerCase();
    const isValidDomain = allowedDomains.some(domain => emailLower.endsWith(domain));

    if (!isValidDomain) {
      setError('❌ Only @dubizzle.com.lb or @olx.com.lb emails are allowed.');
      return;
    }

    // ✅ Supabase authentication using email + password
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: userIdentifier,
      password: password,
    });

    if (signInError) {
      console.error('❌ Login failed:', signInError.message);
      setError('❌ Invalid email or password.');
      return;
    }

    const user = data?.user;

    if (!user.email_confirmed_at) {
      setError('❌ Please verify your email before logging in.');
      return;
    }

    console.log("✅ Logged in as:", user.email);

    // ✅ Save authenticated email to localStorage
    localStorage.setItem('driverID', user.email);
    localStorage.setItem('loggedIn', 'true');

    if (onLoginSuccess) {
      onLoginSuccess(user.email); // Load LeadForm
    }

    setShowMessage(true);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          {/* ✅ OLX logo moved inside the card and above the title */}
          <img className="logo" src="/olx-logo.png" alt="OLX Logo" />

          <h1 className="title">Zoning Lead</h1>
          <p className="subtitle">Sign-in</p>

          {/* ✅ Sign-up link (only one) */}
          <p
            style={{
              marginTop: '10px',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline',
              color: '#007bff'
            }}
            onClick={onShowSignup}
          >
            Don’t Have An Account?<br />Sign Up
          </p>

          <form className="form" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              className="input validate"
              required
              value={userIdentifier}
              onChange={(e) => setUserIdentifier(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-login">Sign In</button>
          </form>

          {error && (
            <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}

          {showMessage && (
            <div className="drive-safe-message">
              Drive Safe! 🚦
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;