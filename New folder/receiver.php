<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "edufundd";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sqlCreateDB = "CREATE DATABASE IF NOT EXISTS $database";
if ($conn->query($sqlCreateDB) !== TRUE) {
    die("Error creating database: " . $conn->error);
}

$conn->select_db($database);

// Ensure the table structure is correct
$sqlCreateTable = "
CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_name VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    request_help TEXT NOT NULL,
    amount_needed FLOAT NOT NULL,
    proof_upload VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending'
)";

if ($conn->query($sqlCreateTable) !== TRUE) {
    die("Error creating table: " . $conn->error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $applicant_name = $_POST['applicant_name'];
    $wallet_address = $_POST['wallet_address'];
    $request_help = $_POST['request_help'];
    $amount_needed = $_POST['amount_needed'];
    $proof_upload = $_POST['proof_upload']; // Get the proof from the dropdown

    // Insert data into the requests table
    $query = "INSERT INTO requests (applicant_name, wallet_address, request_help, amount_needed, proof_upload, status)
              VALUES ('$applicant_name', '$wallet_address', '$request_help', '$amount_needed', '$proof_upload', 'Pending')";

    if ($conn->query($query) === TRUE) {
        $_SESSION['success_message'] = "Request submitted successfully!";

        // Insert into transaction_history table as well
        $insertTransaction = "INSERT INTO transaction_history (receiver_address, amount, transaction_status)
                              VALUES ('$wallet_address', '$amount_needed', 'Pending')";

        if ($conn->query($insertTransaction) !== TRUE) {
            $_SESSION['error_message'] = "Error: " . $conn->error;
        }
    } else {
        $_SESSION['error_message'] = "Error: " . $conn->error;
    }

    header("Location: " . $_SERVER['PHP_SELF']); // Redirect to the same page
    exit(); // Stop further execution
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Applicant Request</title>
    <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.0/dist/ethers.umd.min.js"></script>
    <style>
        /* Lavender theme styles */
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to right, #d1c4e9, #f3e5f5);
            color: #4b0082;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            text-align: left;
            padding: 30px;
            border: 1px solid #e6e6fa;
            border-radius: 15px;
            background-color: #f8f0ff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 80%;
            max-width: 800px;
        }

        h1 {
            color: #4b0082;
            font-size: 2.2em;
            font-family: 'Georgia', serif;
            margin: 20px 0;
            text-align: center;
            text-transform: uppercase;
        }

        .form-group {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .form-group label {
            width: 40%;
            text-align: left;
            font-size: 1.1em;
            font-weight: bold;
        }

        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group textarea,
        .form-group select {
            width: 55%;
            padding: 10px;
            margin-left: 5%;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1em;
        }

        textarea {
            font-size: 1em;
            resize: vertical;
        }

        input[type="submit"], .button {
            text-decoration: none;
            font-size: 1.1em;
            padding: 12px 25px;
            margin: 10px;
            border: none;
            border-radius: 10px;
            color: #fff;
            background-color: #4b0082;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover, .button:hover {
            background-color: #6a0dad;
        }

        .center-button {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        #request_help {
            font-family: 'Courier New', monospace;
            font-size: 1.2em;
            color: #4b0082;
            font-weight: bold;
        }

        .message {
            text-align: center;
            font-size: 1.2em;
            font-weight: bold;
            color: #4b0082;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="center-button">
            <button id="connectMetaMask" class="button">Connect MetaMask</button>
        </div>

        <h1>Applicant Request Form</h1>

        <?php if (isset($_SESSION['success_message'])): ?>
            <div class="message" style="color: green;">
                <?php echo $_SESSION['success_message']; unset($_SESSION['success_message']); ?>
            </div>
        <?php elseif (isset($_SESSION['error_message'])): ?>
            <div class="message" style="color: red;">
                <?php echo $_SESSION['error_message']; unset($_SESSION['error_message']); ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="receiver.php">
            <div class="form-container">
                <div class="form-group">
                    <label for="applicant_name">Applicant Name:</label>
                    <input type="text" id="applicant_name" name="applicant_name" required>
                </div>

                <div class="form-group">
                    <label for="wallet_address">Wallet Address:</label>
                    <input type="text" id="wallet_address" name="wallet_address" required>
                </div>
            </div>

            <div class="form-container">
                <div class="form-group">
                    <label for="request_help">Request Help:</label>
                    <textarea id="request_help" name="request_help" rows="4" placeholder="Describe your need here" required></textarea>
                </div>

                <div class="form-group">
                    <label for="amount_needed">Amount Needed (ETH):</label>
                    <input type="number" step="0.01" id="amount_needed" name="amount_needed" required>
                </div>
            </div>

            <div class="form-container">
                <div class="form-group">
                    <label for="proof_upload">Proof Type:</label>
                    <select id="proof_upload" name="proof_upload" required>
                        <option value="10th_certificate">10th Certificate</option>
                        <option value="aadhaar_certificate">Aadhaar Certificate</option>
                        <option value="12th_certificate">12th Certificate</option>
                        <option value="identity_proof">Other Identity Proof</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <input type="submit" value="Submit Request" style="display: block; margin: 0 auto;">
            </div>
        </form>

        <div class="center-button">
            <form action="receiveramt.php" method="GET">
                <a href="index.php" class="button">Home</a>
            </form>
        </div>

        <div id="walletAddress" class="message"></div>
    </div>

    <script>
        document.getElementById('connectMetaMask').onclick = async function() {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                document.getElementById('walletAddress').textContent = "Wallet Address: " + walletAddress;
                document.getElementById('wallet_address').value = walletAddress; // Set to input field
            } else {
                alert("MetaMask is not installed");
            }
        };
    </script>
</body>
</html>
