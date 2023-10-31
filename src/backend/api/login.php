<?php
require('../db/CORS.php');
require('../db/connection.php');

// Get JSON data from the request
$data = file_get_contents("php://input");
$request = json_decode($data);

// Initialize a response array
$response = array();

// Get the email and password from the request
if (isset($request->email) && isset($request->password)) {
    $email = $request->email;
    $enteredPassword = $request->password;

    // Get the hash of the password from your database based on the email
    $query = "SELECT id, email, password FROM users WHERE email = ?";
    $stmt = $mySQL->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $hashedPassword = $user['password'];

        if (password_verify($enteredPassword, $hashedPassword)) {
            // Start a session
            session_start();
            // Create a session entry in your sessions table
            http_response_code(200);
            $session_id = bin2hex(random_bytes(32));
            $user_id = $user['id'];
            $login_time = date('Y-m-d H:i:s');
            $insert_query = "INSERT INTO sessions (session_id, user_id, login_time) VALUES (?, ?, ?)";
            $insert_stmt = $mySQL->prepare($insert_query);
            $insert_stmt->bind_param("sss", $session_id, $user_id, $login_time);
            $insert_stmt->execute();

            // Generate a token by encrypting session data
            $session_data = array('session_id' => $session_id, 'user_id' => $user_id);
            $token = base64_encode(json_encode($session_data));

            $response = array(
                'status' => 200, // HTTP-statuskode
                'message' => "The user is successfully logged in",
                'token' => $session_id,
                'email' => $user['email'],
                'redirectTo' => '/dashboard'
            );


        } else {
            $response['message'] = "Incorrect password";
            http_response_code(401);
        }
    } else {
        $response['message'] = "User not found in the database";
        http_response_code(404);
    }

    $stmt->close();
} else {
    $response['message'] = "Nothing to process";
}

// Send the response as JSON
echo json_encode($response);
