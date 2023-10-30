<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

require ('../db/connection.php'); 

session_start();

$data = json_decode(file_get_contents('php://input'));
$sessionKey = $data->sessionKey;

$userId = $_SESSION['user_id'];

$sql = "SELECT user_id FROM sessions WHERE session_id = ?";
$stmt = $mySQL->prepare($sql); // Assuming your database connection variable is $mySQL
$stmt->bind_param("s", $sessionKey);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $storedUserId = $user['user_id'];

    if ($userId === $storedUserId) {
        http_response_code(200);
        echo json_encode(['valid' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['valid' => false]);
    }
} else {
    http_response_code(401);
    echo json_encode(['valid' => false]);
}
