<?php
require('../db/CORS.php');
require('../db/connection.php');

// Læs inputdata som ren tekst fra anmodningen
$data = file_get_contents("php://input");

// Tjek om token er tilgængelig og ikke tom
if (!empty($data)) {
    // Hent token fra data
    $token = $data;

    // Forbered SQL-forespørgsel for at finde token i databasen
    $query = "SELECT session_id FROM sessions WHERE session_id = ?";
    $stmt = $mySQL->prepare($query);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Token blev fundet i databasen
        $stmt->bind_result($session_id);
        $stmt->fetch();
        $response = array('valid' => true, 'data from FE token' => $token, 'data from DB' => $session_id);
    } else {
        // Token blev ikke fundet
        $response = array('valid' => false, 'error' => 'Token not found in the database');
    }

    $stmt->close();
} else {
    // Token mangler eller er tom, send en fejlmeddelelse
    $response = array('valid' => false, 'error' => 'Token is missing or empty');
}

// Send respons som JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
