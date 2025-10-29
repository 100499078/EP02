// ----------------- REGISTRO Y VALIDACIÓN -----------------
document.addEventListener("DOMContentLoaded", () => {
      // Si ya hay usuario registrado, redirigir a indexB.html
      const usuarioExistente = JSON.parse(localStorage.getItem("usuarioActual"));
      if(usuarioExistente) {
        window.location.href = "indexB.html";
        return;
      }


    const form = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');
    const privacidad = document.getElementById("privacidad");
    const boton = document.getElementById("guardarBtn");

    if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mensaje.textContent = "";

    // 1. Toma de datos
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const confirmEmail = document.getElementById("confirmEmail").value.trim();
        const fecha = document.getElementById("fechaNacimiento").value;
        const login = document.getElementById("login").value.trim();
        const pass = document.getElementById("password").value;
        const perfil = document.getElementById("imagen");

    // 2. Validación modular
        if (!validarNombre(nombre)) return mostrarMensaje("Nombre demasiado corto.", false);
        if (!validarApellidos(apellidos)) return mostrarMensaje("Apellidos incorrectos.", false);
        if (!validarEmail(email)) return mostrarMensaje("Email inválido.", false);
        if (email !== confirmEmail) return mostrarMensaje("Los emails no coinciden.", false);
        if (fecha && !validarFecha(fecha)) return mostrarMensaje("Fecha de nacimiento incorrecta.", false);
        if (!validarLogin(login)) return mostrarMensaje("Login demasiado corto.", false);
        if (!validarPassword(pass)) return mostrarMensaje("Contraseña inválida.", false);
        if (!validarPerfil(perfil)) return mostrarMensaje("Imagen de perfil inválida.", false);
        if (!privacidad.checked) return mostrarMensaje("Debes aceptar la política.", false);

    // Guardar en localStorage y mostrar éxito
        const reader = new FileReader();
        reader.onload = function(e) {
        // Recupera el listado de usuarios existente o crea uno nuevo
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Crea el usuario nuevo
        const usuario = {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            fecha: fecha,
            login: login,
            password: pass,
            perfil: e.target.result
        };

        // Añade el nuevo usuario al array
        usuarios.push(usuario);

        // Guarda el array actualizado
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Para la sesión activa si lo necesitas, guarda el usuario actual
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));

        mostrarMensaje("¡Usuario registrado correctamente!", true);
        setTimeout(function() { window.location.href = "indexB.html"; }, 1500);
        };
        reader.readAsDataURL(perfil.files[0]);
    });
    }
    // Funciones de validación
    function validarNombre(nombre) {
    return nombre.length >= 3;
    }
    function validarApellidos(apellidos) {
    const partes = apellidos.split(" ");
    return partes.length >= 2 && partes.every(function(p) { return p.length >= 3; });
    }
    function validarEmail(email) {
    const regex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
    }
    function validarFecha(fecha) {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    return edad >= 10 && edad <= 120 && nacimiento <= hoy;
    }
    function validarLogin(login) {
    return login.length >= 5;
    }
    function validarPassword(pass) {
    return pass.length >= 8 &&
        /[A-Z]/.test(pass) &&
        /[a-z]/.test(pass) &&
        (pass.match(/\d/g) || []).length >= 2 &&
        /[!@#$%^&*()_\-]/.test(pass);
    }
    function validarPerfil(fileInput) {
    if (!fileInput.files[0]) return false;
    const type = fileInput.files[0].type;
    return ['image/webp','image/png','image/jpeg'].includes(type);
    }

    // Muestra mensaje en pantalla, tipo diapositiva
    function mostrarMensaje(msg, esExito) {
    mensaje.textContent = msg;
    mensaje.style.color = esExito ? "green" : "red";
    }
    });



