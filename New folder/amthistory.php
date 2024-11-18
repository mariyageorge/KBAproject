<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "edufundd";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->select_db($database);

// Fetch the transaction history
$sql = "SELECT * FROM transaction_history";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction History</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #4b0082;
        }
        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #4b0082;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            text-align: center;
            padding: 10px;
            background-color: #4b0082;
            color: white;
            border-radius: 10px;
            text-decoration: none;
        }
        .button:hover {
            background-color: #6a0dad;
        }
    </style>
</head>
<body>

<h1>Transaction History</h1>

<table>
    <tr>
        <th>Receiver Address</th>
        <th>Amount (ETH)</th>
        <th>Status</th>
    </tr>

    <?php while($row = $result->fetch_assoc()) { ?>
    <tr>
        <td><?php echo $row['receiver_address']; ?></td>
        <td><?php echo $row['amount']; ?></td>
        <td><?php echo $row['transaction_status']; ?></td>
    </tr>
    <?php } ?>
</table>

<a href="index.php" class="button">Back to Home</a>

</body>
</html>
