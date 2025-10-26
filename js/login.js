// ----------------- INICIO DE SESIÓN -----------------<!--Verificar sesión-->

 
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-login");
  const mensaje = document.getElementById("mensaje-login");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-pass");

  if(form){
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log("Formulario enviado");

      // Obtenemos el usuario del localStorage
      const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
      if (!usuarioGuardado) {
        mostrarMensaje("No hay usario registrado con ese mail. Por favor, regístrese.", false);
        return;
      }
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Validamos las credenciales
      if (emailInput.value.trim() === usuarioGuardado.email && passwordInput.value === usuarioGuardado.password) {
        localStorage.setItem("usuarioLogueado", email);
        window.location.href = "indexB.html";
      }
      else {
        mostrarMensaje("Email o contraseña incorrectos.", false);
      }
    });
  }

// Muestra mensaje en pantalla, tipo diapositiva
  function mostrarMensaje(msg, esExito) {
    mensaje.textContent = msg;
    mensaje.style.color = esExito ? "green" : "red";
  }
});