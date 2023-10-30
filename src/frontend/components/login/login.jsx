import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginAttempted(true);

    const response = await fetch(process.env.REACT_APP_Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });
    try {
      const data = await response.json();

      if (response.status === 200) {
        setLoginStatus(true);
        setLoginMessage(data.message);
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        navigate(data.redirectTo, { state: { email: data.email } });
        console.log("redirect to: " + data.redirectTo);
        console.log("Login successful:" + data.token);
        console.log("Login successful:" + data.email);
      } else {
        setLoginStatus(false);
        setLoginMessage(data.message);
        localStorage.setItem("isLoggedIn", false)
      }
    } catch (error) {
      console.error('Fejl i JSON-parsing:', error);
      // Handle errors, e.g., set an error message in your frontend
    }
  };
  

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["login-header"]}>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles["form-group"]}>
          <label htmlFor="email" className={styles["form-label"]}>E-mail:</label>
          <input
            type="text"
            id="email"
            className={styles["form-input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      {loginAttempted && (
        <p className={loginStatus ? styles["login-success"] : styles["login-error"]}>
          {loginMessage}
        </p>
      )}
    </div>
  );
}

export default Login;
