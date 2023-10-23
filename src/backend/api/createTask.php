<?php
include('db/connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $taskText = $_POST['task']; // Hent opgavetekst fra POST-forespørgsel

    // Forbered og udfør SQL-forespørgslen
    $sql = "INSERT INTO tasks (task_text) VALUES (?)";
    $stmt = $mySQL->prepare($sql);
    $stmt->bind_param("s", $taskText); // "s" angiver, at det er en streng
    if ($stmt->execute()) {
        // Send en succesbesked til frontend
        echo json_encode(['message' => 'Opgave oprettet med succes']);
    } else {
        // Håndter fejl og send en fejlbesked til frontend
        echo json_encode(['error' => 'Fejl under oprettelse af opgave: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    // Håndter ugyldige anmodninger
    echo json_encode(['error' => 'Ugyldig anmodning']);
}