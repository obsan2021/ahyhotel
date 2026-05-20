<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Ahy Hotel</title>
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
    <div class="admin-container">
        <h1>Admin Dashboard</h1>
        <div class="admin-stats">
            <div class="stat-card">
                <h3>Total Bookings</h3>
                <p>156</p>
            </div>
            <div class="stat-card">
                <h3>Occupancy Rate</h3>
                <p>78%</p>
            </div>
            <div class="stat-card">
                <h3>Revenue (Month)</h3>
                <p>$45,890</p>
            </div>
        </div>
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>
