<?php
require('../db/CORS.php');

// Hent JSON-data fra anmodningen
$data = file_get_contents("php://input");
$request = json_decode($data);

// Initialiser et responsarray
$response = array();

// Tjek om de nødvendige felter (f.eks. email og password) er til stede i JSON-data
if (isset($request->email) && isset($request->password)) {
    $email = $request->email;
    $password = $request->password;


    include('../db/connection.php');

    // Forbered en SQL-forespørgsel til at indsætte brugeren
    $query = "INSERT INTO users (email, password) VALUES (?, ?)";
    $stmt = $mySQL->prepare($query);

    // Hash adgangskoden, før du indsætter den i databasen
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Bind parametre og udfør forespørgslen
    $stmt->bind_param("ss", $email, $hashedPassword);
    $stmt->execute();

    // Tjek om indsættelsen var vellykket
    if ($stmt->affected_rows > 0) {
        $response['message'] = "User successfully registered";
        http_response_code(200); // Returnerer HTTP 200 OK ved succes
    } else {
        $response['message'] = "Registration failed";
        http_response_code(400); // Returnerer HTTP 400 Bad Request ved fejl
    }

    $stmt->close();
} else {
    // Håndtering af fejl, hvis påkrævede felter mangler i JSON-data
    $response['message'] = "Error";
    http_response_code(400); // Returnerer HTTP 400 Bad Request ved fejl
}

// Send responsen som JSON
header('Content-Type: application/json');
echo json_encode($response);
