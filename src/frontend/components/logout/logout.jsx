function Logout({ onLogout }) {
  const handleLogout = () => {
    fetch("http://localhost:8000/src/backend/api/logout.php", {
      method: "POST",
      body: JSON.stringify({ session_id: localStorage.getItem("token") }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        if (data.success) {
          // Logout på klienten
          // localStorage.clear(); // Fjern alle brugerdata på klienten
        //  onLogout(false);
        } else {
          console.error("Fejl ved logout:", data.error);
        }
      })
      .catch((error) => {
        console.error("Fejl ved logout:", error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}


export default Logout;
