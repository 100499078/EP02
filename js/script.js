$(document).ready(function() {
    let index = 0;
    const packs = $('.pack-item'); // Seleccionamos todos los elementos de la clase pack-item
    const totalPacks = packs.length;
    let interval;

    // Función para mostrar un pack específico y ocultar los demás
    function showPack(i) {
        packs.removeClass('activo');
        packs.eq(i).addClass('activo');
    }

    function startInterval(){
        interval = setInterval(function() {
            index = (index + 1) % totalPacks; // Incrementa el índice y vuelve al inicio si es necesario
            showPack(index);
        }, 2000); // Cambia de pack cada 2 segundos
    }

    showPack(index);
    startInterval();

    $('.button-right').click(function(){
        index = (index + 1) % totalPacks; // Incrementa el índice y vuelve al inicio si es necesario
        showPack(index);
        // Reinicia el intervalo para que no cambie inmediatamente después de hacer clic
        clearInterval(interval);
        startInterval();
    });
    $('.button-left').click(function(){
        index = (index - 1 + totalPacks) % totalPacks; // Decrementa el índice y vuelve al final si es necesario
        showPack(index);
        // Reinicia el intervalo para que no cambie inmediatamente después de hacer clic
        clearInterval(interval);
        startInterval();
    });
    
    $('.btn-comprar').click(function(){
        const packNumber = $(this).closest('.pack-item').data('pack');
        window.location.href = 'indexC.html?pack=' + packNumber;
    })
});


// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('registroForm');
  const privacidad = document.getElementById('privacy-policy');
  const guardarBtn = document.getElementById('guardarBtn');
  const mensaje = document.getElementById('mensaje');

  if (form) { // Solo ejecuta en indexA.html
    privacidad.addEventListener('change', () => {
      guardarBtn.disabled = !privacidad.checked;
    });

    function validarFormulario() {
      const nombre = document.getElementById('nombre').value.trim();
      const apellidos = document.getElementById('apellidos').value.trim();
      const email = document.getElementById('email').value.trim();
      const confirmEmail = document.getElementById('confirmEmail').value.trim();
      const fechaNacimiento = document.getElementById('fechaNacimiento').value;
      const login = document.getElementById('login').value.trim();
      const password = document.getElementById('password').value;
      const imagen = document.getElementById('imagen').files[0];

      if (nombre.length < 3) return "El nombre debe tener al menos 3 caracteres.";

      const partes = apellidos.split(" ").filter(p => p.length >= 3);
      if (partes.length < 2) return "Debe introducir al menos dos apellidos válidos.";

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) return "Formato de correo no válido.";
      if (email !== confirmEmail) return "Los correos no coinciden.";

      const hoy = new Date();
      const fecha = new Date(fechaNacimiento);
      if (fecha > hoy) return "La fecha de nacimiento no puede ser futura.";
      if (hoy.getFullYear() - fecha.getFullYear() > 120) return "Fecha de nacimiento inválida.";

      if (login.length < 5) return "El login debe tener al menos 5 caracteres.";

      const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!regexPass.test(password))
        return "Contraseña inválida. Debe tener 8 caracteres, 2 números, 1 mayúscula, 1 minúscula y 1 símbolo.";

      if (!imagen) return "Debe subir una imagen.";
      const formatosValidos = ["image/webp", "image/png", "image/jpeg"];
      if (!formatosValidos.includes(imagen.type))
        return "Formato de imagen no válido. Use .webp, .png o .jpg.";

      return null;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const error = validarFormulario();

      if (error) {
        mensaje.style.color = "red";
        mensaje.textContent = error;
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        const datosUsuario = {
          nombre: document.getElementById('nombre').value,
          apellidos: document.getElementById('apellidos').value,
          email: document.getElementById('email').value,
          fechaNacimiento: document.getElementById('fechaNacimiento').value,
          login: document.getElementById('login').value,
          imagen: reader.result
        };
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));

        mensaje.style.color = "green";
        mensaje.textContent = "Registro exitoso. Redirigiendo...";
        setTimeout(() => window.location.href = "indexB.html", 1500);
      };
      reader.readAsDataURL(document.getElementById('imagen').files[0]);
    });
  }

  // ======================================
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreElemento = document.getElementById("usuarioNombre");
  const imgElemento = document.getElementById("usuarioImg");
  const logoutBtn = document.querySelector(".sidebar-logout");

  if (nombreElemento && usuario) {
    nombreElemento.textContent = usuario.nombre + " " + usuario.apellidos;
    if (imgElemento) imgElemento.src = usuario.imagen;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.href = "indexA.html";
    });
  }
});

// ======================================

// Home: cookies

function setCookie(cname, cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" +d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name)==0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// No terminado
function checkCookie() {
  let username = getCookkie("login-email");
  if (username != ""){
    alert("Hola de nuevo" + username);
  } else {
    username = prompt("Por favor introduzca su nombre:", "");
    if(username != "" && username != null){
      setCookie("login-email", username, 365);
    }
  }
}