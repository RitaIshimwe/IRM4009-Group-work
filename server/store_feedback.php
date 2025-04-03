<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "medsecuredb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Connection failed: ' . $conn->connect_error
    ]));
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['feedback']) || empty(trim($data['feedback']))) {
    echo json_encode([
        'success' => false,
        'message' => 'Feedback cannot be empty'
    ]);
    exit;
}

// Sanitize the feedback
$feedback = $conn->real_escape_string(trim($data['feedback']));

// Insert into database
$sql = "INSERT INTO feedback (message, created_at) VALUES ('$feedback', NOW())";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        'success' => true,
        'message' => 'Feedback submitted successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $sql . '<br>' . $conn->error
    ]);
}

$conn->close();
?>
