<?php
if (isset($_POST)) {
    $sala = $_POST['selRegSala'];
    $pelicula = $_POST['txtRegPelicula'];
    $sinopsis = $_POST['txtRegSinopsis'];

    require("conexion.php");
    
    $query = $pdo->prepare("INSERT INTO peliculas (nombre, sinopsis, idsala) VALUES (:peli, :sinopsis, :sala)");
    $query->bindParam(":sala", $sala);
    $query->bindParam(":peli", $pelicula);
    $query->bindParam(":sinopsis", $sinopsis);
    $query->execute();
    $pdo = null;
    echo "ok";
}
?>