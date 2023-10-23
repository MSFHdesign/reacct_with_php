import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importér BrowserRouter

import Login from "./frontend/components/login/login";
// Import andre komponenter, hvis nødvendigt

import "./frontend/style/App.css";
import "./frontend/style/index.css";

function App() {
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Definér ruter til andre sider her */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
