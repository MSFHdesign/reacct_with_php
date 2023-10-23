import React, { useState } from "react";
import styles from "./login.module.css"; // Importér stilklasserne som et objekt

function Login() {
  // Tilstandsvariabler til at gemme brugernavn og adgangskode
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // Funktion til at håndtere formularindsendelse
  const handleLogin = async (e) => {
    e.preventDefault();

    // Her kan du bruge JavaScript Fetch API til at sende brugernavn og adgangskode til din PHP-backend
    // og håndtere svaret, f.eks. setLoginStatus("Success") eller setLoginStatus("Error").

    // Eksempel: Send data til backend
    const response = await fetch('backend/api/login.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      setLoginStatus("Success");
    } else {
      setLoginStatus("Error");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["login-header"]}>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles["form-group"]}>
          <label htmlFor="username" className={styles["form-label"]}>Brugernavn:</label>
          <input
            type="text"
            id="username"
            className={styles["form-input"]}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles["form-label"]}>Adgangskode:</label>
          <input
            type="password"
            id="password"
            className={styles["form-input"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles["login-button"]}>Log ind</button>
      </form>
      {loginStatus === "Success" && <p className={styles["login-success"]}>Log ind var vellykket!</p>}
      {loginStatus === "Error" && <p className={styles["login-error"]}>Fejl i log ind. Tjek dine oplysninger.</p>}
    </div>
  );
}

export default Login;
