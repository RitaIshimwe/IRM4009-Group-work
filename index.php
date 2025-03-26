<?php
include("database.php");

// We need to use sessions, so you should always initialize sessions using the below function
session_start();
// If the user is logged in, redirect to the home page
if (isset($_SESSION['account_loggedin'])) {
    header('Location: home.php');
    exit;
}

$username = "John Doe";
$password = "secretword";
$hash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, password)
                    VALUES ('$username', '$hash')";

//$sql2 = "INSERT INTO users (username, password) VALUES ('test', '$hash')";

try {
    mysqli_query($conn, $sql);
    echo "User is now registered";
} catch (mysqli_sql_exception) {
    echo "Could not register user";
}

mysqli_close($conn);
?>


<!DOCTYPE html>
<html>

<head>
    <link href="style.css" rel="stylesheet" type="text/css">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1">
    <title>MedSecure - Login</title>
</head>

<body>
    <div class="login">

        <img src="https://cdn.discordapp.com/attachments/1281294347672879219/1349388389950029905/image.png?ex=67d8315e&is=67d6dfde&hm=80bab06eb68eb6475a613e0a19a945f98deb27ac9577d1a33dc2d3497e2bd085&" alt="MedSecure Logo">
        <h1>MedSecure Login</h1>


        <form action="authenticate.php" method="post" class="form login-form">

            <label class="form-label" for="username">Username</label>
            <div class="form-group">
                <svg class="form-icon-left" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <input class="form-input" type="text" name="username" placeholder="Username" id="username" required>
            </div>

            <label class="form-label" for="password">Password</label>
            <div class="form-group mar-bot-5">
                <svg class="form-icon-left" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
                <input class="form-input" type="password" name="password" placeholder="Password" id="password" required>
            </div>

            <button class="btn blue" type="submit">Login</button>

            <!--<p class="register-link">Don't have an account? <a href="register.php" class="form-link">Register</a></p> -->
            <p>Please enter your Carleton credentials</p>
        </form>

    </div>
</body>

</html>
