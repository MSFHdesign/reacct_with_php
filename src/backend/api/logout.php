<?php
require('../db/CORS.php');
require('../db/connection.php');

// Læs inputdata som ren tekst fra anmodningen


    $response = array('success' => true);


header('Content-Type: application/json');
echo json_encode($response);
