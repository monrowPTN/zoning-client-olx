import './landing.css';
import './custom.css';
import './App.css';
import { useState } from 'react';
import Login from './pages/Login';
import LeadForm from './LeadForm';
import Signup from './pages/Signup'; // ✅ Import Signup

function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [driverID, setDriverID] = useState(() => localStorage.getItem('driverID') || '');
  const [showSignup, setShowSignup] = useState(false); // ✅ Toggle between Login & Signup

  const handleLoginSuccess = (identifier) => {
    setLoggedIn(true);
    setDriverID(identifier);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('driverID', identifier);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setDriverID('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('driverID');
  };

  return (
    <div>
      {loggedIn ? (
        <LeadForm onLogout={handleLogout} driverID={driverID} />
      ) : showSignup ? (
        <Signup onSignupSuccess={handleLoginSuccess} onShowLogin={() => setShowSignup(false)} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} onShowSignup={() => setShowSignup(true)} />
      )}
    </div>
  );
}

export default App;