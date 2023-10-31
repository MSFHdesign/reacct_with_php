import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LP from "./pages/LP";
import Dashboard from "./pages/Dashboard";
import "./frontend/style/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const checkSession = () => {
    const token = localStorage.getItem("token");
    fetch(process.env.REACT_APP_SessionCheck, {
      method: "POST",
      body: token,
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        setIsLoggedIn(data.valid);
      })
      .catch((error) => {
        console.error("Fejl ved anmodning om login-status:", error);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    // Kør checkSession ved komponentindlæsning og derefter hvert minut (eller efter behov)
    checkSession();

  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LP LoggedIn={setLoggedIn}/>} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard checkSession={checkSession} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
