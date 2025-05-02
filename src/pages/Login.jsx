import '../landing.css';
import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowMessage(true);

    // Simulate login success
    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 1000);

    console.log('Login Submitted ✅');
  };

  return (
    <div className="login-page">

      {/* ✅ OLX Logo Header */}
      <div className="header">
        <img src="/olx-logo.png" alt="OLX Logo" className="header-logo" />
      </div>

      {/* ✅ Login Card */}
      <div className="login-card">
        <h1 className="title">Zoning Lead</h1>
        <p className="subtitle">Sign-in</p>

        <form className="form" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Driver Email or Phone Number" 
            className="input validate"
            pattern="(^\d{8}$)|(^[a-zA-Z0-9._%+-]+@dubizzle.com.lb$)"
            title="Enter a valid 8-digit phone number or an email ending with @dubizzle.com.lb"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          <button type="submit" className="btn-login">Sign In</button>
        </form>

        {showMessage && (
          <div className="drive-safe-message">
            Drive Safe! 🚦
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Login;