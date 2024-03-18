<?php
// Połączenie z bazą danych
$conn = mysqli_connect("localhost", "player", "password123", "easter_game");

// Sprawdzenie połączenia
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Bluetooth device has connected successfully<br>";

// Pobranie danych z formularza i ciasteczka
$user_name = mysqli_real_escape_string($conn, $_POST["user_name"]);
$user_score = $_COOKIE["user_score"];

// Zapytanie SQL do dodania nowego rekordu
$sql = "INSERT INTO score (user_name, user_score) VALUES ('$user_name', '$user_score')";

// Wykonanie zapytania, sprawdzenie poprawności danych
if(isset($user_score) && strlen($user_name) < 40){
    if (mysqli_query($conn, $sql)) {
        echo "<br>New record created successfully";
    } else {
        echo "<br>Error: " . $sql . "<br>" . mysqli_error($conn);
    }
} else {
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
        // Zapytanie SQL do pobrania danych z tabeli
        $sql = "SELECT * FROM score ORDER BY user_score DESC";

        // Wykonanie zapytania
        $result = mysqli_query($conn, $sql);

        // Przetworzenie wyników zapytania na tablicę asocjacyjną
        $res_table = mysqli_fetch_all($result, MYSQLI_ASSOC);

        // Wyświetlenie danych w tabeli
        foreach ($res_table as $table) {
            echo "<tr>";
            echo "<td>" . $table["id"] . "</td>";
            echo "<td>" . $table["user_name"] . "</td>";
            echo "<td>" . $table["user_score"] . "</td>";
            echo "</tr>";
        }
        // Zwolnienie zasobów i zamknięcie połączenia
        mysqli_free_result($result);
        mysqli_close($conn);
        ?>
    </table>
    <a href="/index.html">Play again</a>
</body>
</html>
