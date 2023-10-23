<?php
// Hent brugerens indtastede brugernavn og adgangskode fra anmodningen
$username = $_POST['username'];
$password = $_POST['password'];

// Lav en SQL-forespørgsel for at tjekke, om brugeren findes i databasen
$query = "SELECT id, name, email FROM users WHERE name = ? AND password = ?";
$stmt = $mySQL->prepare($query);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

// Tjek om brugeren blev fundet
if ($result->num_rows > 0) {
    // Brugeren blev fundet, send en succesmeddelelse til frontend
    echo "Success";
} else {
    // Brugeren blev ikke fundet, send en fejlmeddelelse til frontend
    echo "Error";
}

$stmt->close();
