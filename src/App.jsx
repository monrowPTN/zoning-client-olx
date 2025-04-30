import { useState } from 'react';
import Login from './pages/Login';
import LeadForm from './LeadForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <LeadForm />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;