import React from "react";
import Logout from "../frontend/components/logout/logout";
import { useLocation } from 'react-router-dom';

function Dashboard() {

  const location = useLocation();
  const data = location.state;
  const email = data.email;
  console.log(email);


  return (
    <div>
    <h1>Dashboard</h1>
    {email ? (
      <p>Velkommen {email} din dashboard</p>
    ) : (
      <p>Velkommen din dashboard</p>
    )}
    <Logout />
  </div>
  
  );
}

export default Dashboard;
