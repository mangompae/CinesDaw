<?php
     if (isset($_POST)) {
        $id = $_POST['selConSala'];
        require "conexion.php";
        $query = $pdo->prepare("SELECT Nombre, sinopsis FROM peliculas WHERE idSala = :sala");
        $query->bindParam(":sala", $id);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($resultado);
    }

?>