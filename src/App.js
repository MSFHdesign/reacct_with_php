import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import LP from "./pages/LP";
import Dashboard from "./pages/Dashboard";
import "./frontend/style/App.css";
function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LP />} />
         <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
