<?php
require "conection.php";

$stmt = $pdo->query("SELECT * FROM pure");
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($produtos);
?>