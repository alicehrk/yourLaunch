<?php

    $names = $_COOKIE['name'];

    $conn = mysqli_connect("localhost", "root", "cscscs");

    $restaurantInformation = mysqli_select_db($conn, 'restinfo');
    if(!$restaurantInformation) {
        $create_db_query = "CREATE DATABASE restinfo";
        if(mysqli_query($conn, $create_db_query)) {
        } else {
            return;
        }
    }

    $restaurantInformation = mysqli_select_db($conn, 'restinfo');

    $check = mysqli_query($conn, "SELECT 1 FROM 'restinfo' LIMIT 1");

    if ($check == false) {
        $create_table_query = "CREATE TABLE IF NOT EXISTS rest_name (
            rest_name varchar(255) NOT NULL,
            cnt int(11),
            PRIMARY KEY (rest_name)
            );";
        $result = $conn->query($create_table_query);

        if ($result == false) {
            echo "Error: " . $create_table_query . "<br>" . $connect->error;
        }
    }

    $insert_query = "INSERT INTO rest_name (rest_name, cnt) VALUES ('$names', 1)
    ON DUPLICATE KEY UPDATE cnt = cnt + 1";
    if ($conn->query($insert_query) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $insert_query . "<br>" . $conn->error;
    }
    $conn->close();

?>