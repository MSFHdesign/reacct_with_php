import React, { useState } from "react";
import styles from "./signup.module.css";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const [signupAttempted, setSignupAttempted] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupAttempted(true);

    if (!isValidEmail(email)) {
      setSignupStatus(false);
      setSignupMessage("Ugyldig e-mailadresse.");
      return;
    }

    if (password.length < 8) {
      setSignupStatus(false);
      setSignupMessage("Adgangskoden skal være mindst 8 tegn lang.");
      return;
    }

    console.log(process.env.Register);

    const response = await fetch(process.env.REACT_APP_Register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setSignupStatus(true);
      setSignupMessage(data.message);
    } else {
      setSignupStatus(false);
      setSignupMessage(data.message);
    }
  };

  // Funktion til at validere en e-mailadresse
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className={styles["signup-container"]}>
      <h1 className={styles["signup-header"]}>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className={styles["form-group"]}>
          <label htmlFor="signup-email" className={styles["form-label"]}>E-mail:</label>
          <input
            type="text"
            id="signup-email" // Unik ID for email-input
            className={styles["form-input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="signup-password" className={styles["form-label"]}>Adgangskode:</label>
          <input
            type="password"
            id="signup-password" // Unik ID for password-input
            className={styles["form-input"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles["signup-button"]}>Tilmeld</button>
      </form>
      {signupAttempted && (
        <p className={signupStatus ? styles["signup-success"] : styles["signup-error"]}>
          {signupMessage}
        </p>
      )}

    </div>
  );
}

export default Signup;
