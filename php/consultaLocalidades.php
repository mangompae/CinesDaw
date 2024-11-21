<?php
    if (isset($_POST)) {
        $prov = $_POST['selProvConLoc'];
        require "conexion.php";
        $query = $pdo->prepare("SELECT poblacion FROM localidades WHERE provincia = :pr");
        $query->bindParam(":pr", $prov);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($resultado);
    }

?>