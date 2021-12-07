<?php

    $names = $_COOKIE['name'];

    $conn = mysqli_connect("localhost", "root", "cscscs");
    $db_status = mysqli_select_db($conn, 'termproject');

    if (!$db_status) {
        echo "DB_ERROR";
        exit;
    }

    $insert_query = "INSERT INTO rest_name (restName, cnt) VALUES ('$names', 1)
ON DUPLICATE KEY UPDATE cnt = cnt + 1";

if ($conn->query($insert_query) === TRUE) {
echo "New record created successfully";
} else {
echo "Error: " . $insert_query . "<br>" . $conn->error;
}
$conn->close();
?>