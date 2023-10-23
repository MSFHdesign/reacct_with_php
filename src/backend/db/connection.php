<?php
$server = "mysql29.unoeuro.com";
$username = "siindevelopment_dk";
$password = "r9zbpHRAkyGw5BfDhmxg";
$dbname = "siindevelopment_dk_db";


// Opret forbindelse til databasen
$mySQL = new mysqli($server, $username, $password, $dbname);
$mySQL->set_charset("utf8mb4");