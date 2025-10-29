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
            
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Busca al usuario por email
            const usuarioEmail = usuarios.find(u => u.email === email);

            if (!usuarioEmail) {
                mostrarMensaje("No hay usuario registrado con ese mail. Por favor, regístrate.", false);
                return;
            }

            // Ahora comprueba la contraseña
            if (usuarioEmail.password !== password) {
                mostrarMensaje("La contraseña es incorrecta.", false);
                return;
            }

            // Usuario correcto, guardamos sesión y redirigimos
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioEmail));
            window.location.href = "indexB.html";
        });
    }

    // Muestra mensaje en pantalla, tipo diapositiva
    function mostrarMensaje(msg, esExito) {
        mensaje.textContent = msg;
        mensaje.style.color = esExito ? "green" : "red";
        mensaje.style.display = "block";
    }
});
