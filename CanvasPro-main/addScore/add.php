<?php
#database connection
$conn = mysqli_connect("localhost", "player", "password123", "easter_game");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  echo "bluetooth device has connected successfully<br>";

$user_name = $_POST["user_name"];
$user_score = $_COOKIE["user_score"];


$sql = "INSERT INTO score VALUES (null, '" . mysqli_real_escape_string($conn, $user_name) . "', '" . $user_score ."');";
echo $sql;

if(isset($user_score) && strlen($user_name) < 40){
    if (mysqli_query($conn, $sql)) {
    echo "<br>New record created successfully";
  } else {
    echo "<br>Error: " . $sql . "<br>" . mysqli_error($conn);
  }
}else {
    echo "<br>The score or your name is invalid";
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Added?</title>
</head>
<body>
    <h1>You were probably added to our database :)</h1>
    <table border="2">
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Score</th>
        </tr>
        <?php
        $sql = "SELECT * FROM score WHERE 1 ORDER BY user_score DESC";

        $result = mysqli_query($conn, $sql);

        $res_table = mysqli_fetch_all($result, MYSQLI_ASSOC);

        foreach ($res_table as $table) {
            echo "<tr>";
            echo "<td>" . $table["id"] . "</td>";
            echo "<td>" . $table["user_name"] . "</td>";
            echo "<td>" . $table["user_score"] . "</td>";
            echo "</tr>";
        }
        mysqli_free_result($result);
        mysqli_close($conn);
        ?>
    </table>
    <a href="../index.html">Play again</a>
</body>
</html>