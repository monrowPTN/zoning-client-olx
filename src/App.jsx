import { useState, useEffect } from 'react';
import Login from './pages/Login';
import LeadForm from './LeadForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Read from localStorage on first load
    return localStorage.getItem('loggedIn') === 'true';
  });

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true'); // ✅ Save login status
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn'); // ✅ Clear login status
  };

  return (
    <div>
      {loggedIn ? (
        <LeadForm onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;