// The name of the MySQL database I created with XAMPP is 'medsecuredb'
<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "medsecuredb";
$conn = "";

try {
    $conn = mysqli_connect(
        $db_server,
        $db_user,
        $db_pass,
        $db_name
    );
} catch (mysqli_sql_exception) {
    echo "Could not connect <br>";
}

if ($conn) {
    echo "You are connected <br> ";
}
