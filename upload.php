<?php
$targetDir = "uploads/"; // Directorio donde se guardarán las imágenes subidas
$uploadedFile = $targetDir . basename($_FILES["upload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($uploadedFile, PATHINFO_EXTENSION));

// Verifica si el archivo es una imagen real o un archivo falso
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["upload"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
}

// Verifica si el archivo ya existe
if (file_exists($uploadedFile)) {
    $uploadOk = 0;
}

// Verifica el tamaño del archivo
if ($_FILES["upload"]["size"] > 5000000) { // Cambia el límite según tus necesidades
    $uploadOk = 0;
}

// Permite solo ciertos formatos de imagen
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif") {
    $uploadOk = 0;
}

// Verifica si $uploadOk está configurado en 0 por un error
if ($uploadOk == 0) {
    $response = array(
        'error' => 'Error al subir el archivo.'
    );
} else {
    if (move_uploaded_file($_FILES["upload"]["tmp_name"], $uploadedFile)) {
        $response = array(
            'url' => $uploadedFile,
            'uploaded' => true
        );
    } else {
        $response = array(
            'error' => 'Error al subir el archivo.'
        );
    }
}
header('Content-Type: application/json');
echo json_encode($response);
