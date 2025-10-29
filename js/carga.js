document.addEventListener("DOMContentLoaded", () => {
      const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
      if (usuario) {
        document.getElementById("usuarioNombre").textContent = usuario.nombre + " " + usuario.apellidos;
        document.getElementById("usuarioImg").src = usuario.perfil;
      } else {
        window.location.href = "indexA.html";
      }
    });