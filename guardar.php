<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["contenido"])) {
    $contenido = $_POST["contenido"];
    
    $rutaArchivo = "./data/db.txt"; // Ubicación en la misma ruta
    $archivo = fopen($rutaArchivo, "w");
    
    if ($archivo) {
        fwrite($archivo, $contenido);
        fclose($archivo);
        echo "El contenido se ha guardado en el archivo correctamente.";
    } else {
        echo "No se pudo abrir el archivo para escritura.";
    }
}
?>
