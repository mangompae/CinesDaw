<?php
    $linea = file_get_contents("php://input");
    $datos = explode(",", $linea);
    require "conexion.php";
    $query = $pdo->prepare("INSERT IGNORE INTO provincias (codigo, codigoPostal, nombre, codigoTlf, iso) VALUES (:codigo, :CP, :nombre, :tlf, :iso)");
    $query->bindParam(":codigo", $datos[0]);
    $query->bindParam(":CP", $datos[1]);
    $query->bindParam(":nombre", $datos[2]);
    $query->bindParam(":tlf", $datos[3]);
    $query->bindParam(":iso", $datos[4]);
    $query->execute();
    echo "ok";
?>