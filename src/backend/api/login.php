<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow access from localhost:3000
header("Access-Control-Allow-Headers: Content-Type");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Max-Age: 86400');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit;
}



// Get JSON data from the request
$data = file_get_contents("php://input");
$request = json_decode($data);

// Initialize a response array
$response = array();

// Your MySQL database connection code
$server = "mysql29.unoeuro.com";
$username = "siindevelopment_dk";
$password = "r9zbpHRAkyGw5BfDhmxg";
$dbname = "siindevelopment_dk_db";

$mySQL = new mysqli($server, $username, $password, $dbname);
$mySQL->set_charset("utf8mb4");

// Hent adgangskoden fra anmodningen
if (isset($request->email) && isset($request->password)) {
    $email = $request->email;
    $enteredPassword = $request->password;

    // Hent hashen af adgangskoden fra din database baseret på email
    $query = "SELECT email, password FROM users WHERE email = ?";
    $stmt = $mySQL->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $hashedPassword = $user['password'];

        // Brug password_verify til at sammenligne den indtastede adgangskode og den gemte hash
        if (password_verify($enteredPassword, $hashedPassword)) {
            // Start en session
            session_start();
            // Adgangskoden er korrekt
            $response['message'] = "The user is successfully logged in";
            // Returnerer HTTP 200 OK ved succes
            http_response_code(200); 
            // Gem brugeroplysninger i sessionen
            $_SESSION['user'] = $user;
            // Redirect brugeren til dashboard
            $response['redirectTo'] = "dashboard";

        } else {
            // Forkert adgangskode
            $response['message'] = "Incorrect password";
            http_response_code(401); // Returnerer HTTP 401 Unauthorized ved fejl
        }
    } else {
        // Brugeren blev ikke fundet i databasen
        $response['message'] = "User not found in the database";
        http_response_code(404); // Returnerer HTTP 404 Not Found ved fejl
    }

    $stmt->close();
} else {
    // Behandling af fejl, hvis "email" eller "password" mangler i JSON-data
    $response['message'] = "Error";
}

// Send responsen som JSON
header('Content-Type: application/json');
echo json_encode($response);
