import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../frontend/components/logout/logout.jsx";
function Dashboard({ checkSession, isLoggedIn }) {
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/">Tilbage til startsiden</Link>

      <Logout />
    </div>
  );
}

export default Dashboard;