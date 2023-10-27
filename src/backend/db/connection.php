<?php
$envFile = dirname(__DIR__, 3) . '/.env.local';
if (file_exists($envFile)) {
    $env = parse_ini_file($envFile, false, INI_SCANNER_RAW);

    $dbServer = $env['dbServer'];
    $dbUsername = $env['dbUsername'];
    $dbPassword = $env['dbPassword'];
    $dbName = $env['dbName'];

    // Opret en databaseforbindelse
    $mySQL = new mysqli($dbServer, $dbUsername, $dbPassword, $dbName);
    $mySQL->set_charset("utf8mb4");
} else {
    echo "Error: No .env.local file found";
    exit;
}