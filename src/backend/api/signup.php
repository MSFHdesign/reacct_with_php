<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Tillad adgang fra din React-app
header("Access-Control-Allow-Headers: Content-Type");

// Håndter CORS preflight-anmodning
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Max-Age: 86400');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit;
}

// Hent JSON-data fra anmodningen
$data = file_get_contents("php://input");
$request = json_decode($data);

// Initialiser et responsarray
$response = array();

// Tjek om de nødvendige felter (f.eks. email og password) er til stede i JSON-data
if (isset($request->email) && isset($request->password)) {
    $email = $request->email;
    $password = $request->password;

    // Her kan du tilføje kode til at indsætte brugeren i din database
    // For eksempel bruge MySQLi eller PDO til at indsætte data i databasen

    // Eksempel med MySQLi:
    $server = "mysql29.unoeuro.com";
    $username = "siindevelopment_dk";
    $db_password = "r9zbpHRAkyGw5BfDhmxg";
    $dbname = "siindevelopment_dk_db";

    $mySQL = new mysqli($server, $username, $db_password, $dbname);
    $mySQL->set_charset("utf8mb4");

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
