import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send en fetch-anmodning til http://localhost:8000/login.php for at afslutte sessionen
      const response = await fetch('http://localhost:8000/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Her kan du sende eventuelle data, der kræves for at afslutte sessionen
        body: JSON.stringify({ logout: true }), // Send en anmodning om logud
      });

      if (response.ok) {
        // Sessionen er blevet ødelagt på serveren
        console.log('Brugeren er logget ud');
        navigate('/');
      } else {
        // Håndter fejl, hvis logud-anmodningen ikke lykkes
        console.error('Fejl under logud');
      }
    } catch (error) {
      console.error('Fejl ved logud-anmodning:', error);
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
