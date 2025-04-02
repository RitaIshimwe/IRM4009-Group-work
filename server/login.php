<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Adjust this in production!
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration (replace with your actual credentials)
$db_host = 'localhost';
$db_name = 'medsecuredb'; // the name of our MySQL database is 'medsecuredb'
$db_user = 'your_username';
$db_pass = 'your_password';

// Connect to database
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get input data
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['username']) || !isset($input['password'])) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    exit;
}

$username = trim($input['username']);
$password = trim($input['password']);

// Basic input validation
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password cannot be empty']);
    exit;
}

// Sanitize input (additional security measure)
$username = filter_var($username, FILTER_SANITIZE_STRING);

// Query the database for the user
try {
    $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        exit;
    }
    
    // Verify password (assuming passwords are hashed in the database)
    if (password_verify($password, $user['password'])) {
        // Password is correct
        
        // Generate a token (JWT example - you'll need a JWT library)
        // $token = generateJWT($user['id'], $user['username']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username']
            ],
            // 'token' => $token // Include if using JWT
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}
?>
