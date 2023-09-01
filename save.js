document.addEventListener("DOMContentLoaded", function () {
  const guardarBtn = document.getElementById("envio");
  guardarBtn.addEventListener("click", function () {
      const contenido = window.editor.getData()

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "guardar.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  alert(xhr.responseText); // Respuesta del servidor
              } else {
                  alert("Error al guardar el archivo.");
              }
          }
      };
      xhr.send("contenido=" + encodeURIComponent(contenido));
  });
});
