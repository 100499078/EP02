// ===========================
// Carrusel y packs
// ===========================
$(document).ready(function() {
    let index = 0;
    const packs = $('.pack-item');
    const totalPacks = packs.length;
    let interval;

    function showPack(i) {
        packs.removeClass('activo');
        packs.eq(i).addClass('activo');
    }

    function startInterval() {
        interval = setInterval(function() {
            index = (index + 1) % totalPacks;
            showPack(index);
        }, 2000);
    }

    showPack(index);
    startInterval();

    $('.button-right').click(function() {
        index = (index + 1) % totalPacks;
        showPack(index);
        clearInterval(interval);
        startInterval();
    });
    $('.button-left').click(function() {
        index = (index - 1 + totalPacks) % totalPacks;
        showPack(index);
        clearInterval(interval);
        startInterval();
    });

    $('.btn-comprar').click(function() {
        const packNumber = $(this).closest('.pack-item').data('pack');
        window.location.href = 'indexC.html?pack=' + packNumber;
    });
});

// ----------------- REGISTRO Y VALIDACIÓN -----------------

document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById('registroForm');
  var mensaje = document.getElementById('mensaje');
  var privacidad = document.getElementById("privacidad");
  var boton = document.getElementById("guardarBtn");

  if (privacidad && boton) {
    privacidad.addEventListener('change', function() {
      boton.disabled = !this.checked;
    });
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      mensaje.textContent = "";

    // 1. Toma de datos
      var nombre = document.getElementById("nombre").value.trim();
      var apellidos = document.getElementById("apellidos").value.trim();
      var email = document.getElementById("email").value.trim();
      var confirmEmail = document.getElementById("confirmEmail").value.trim();
      var fecha = document.getElementById("fechaNacimiento").value;
      var login = document.getElementById("login").value.trim();
      var pass = document.getElementById("password").value;
      var perfil = document.getElementById("imagen");

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
      var reader = new FileReader();
      reader.onload = function(e) {
        var usuario = {
          nombre: nombre,
          apellidos: apellidos,
          email: email,
          fecha: fecha,
          login: login,
          perfil: e.target.result
        };
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
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
    var partes = apellidos.split(" ");
    return partes.length >= 2 && partes.every(function(p) { return p.length >= 3; });
  }
  function validarEmail(email) {
    var regex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  function validarFecha(fecha) {
    var hoy = new Date();
    var nacimiento = new Date(fecha);
    var edad = hoy.getFullYear() - nacimiento.getFullYear();
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
    var type = fileInput.files[0].type;
    return ['image/webp','image/png','image/jpeg'].includes(type);
  }

  // Muestra mensaje en pantalla, tipo diapositiva
  function mostrarMensaje(msg, esExito) {
    mensaje.textContent = msg;
    mensaje.style.color = esExito ? "green" : "red";
  }
});


// ===========================
// Cookies 

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let username = getCookie("login-email");
    if (username != "") {
        alert("Hola de nuevo " + username);
    } else {
        username = prompt("Por favor introduzca su nombre:", "");
        if (username != "" && username != null) {
            setCookie("login-email", username, 365);
        }
    }
}
