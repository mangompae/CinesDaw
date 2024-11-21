<?php

if (isset($_POST)) {
    $provincia = $_POST['selProvConLoc'];
    $localidad = $_POST['selLocRegSala'];
    $sala = $_POST['txtRegSala'];

    require("conexion.php");

    $query = $pdo->prepare("INSERT IGNORE INTO salas (provincia, poblacion, nombre) VALUES (:pr, :loc, :sala)");
    $query->bindParam(":pr", $provincia);
    $query->bindParam(":loc", $localidad);
    $query->bindParam(":sala", $sala);
    $query->execute();
    $pdo = null;
    echo "ok";
}

?>