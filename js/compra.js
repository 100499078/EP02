document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-compra');
  const mensaje = document.getElementById('mensaje-compra');
  const botonBorrar = document.querySelector('.btn-limpiar');
  const modo = document.getElementById('modo-compra');
  const cerrarmodo = document.getElementById('cerrar-modo');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    mensaje.textContent = '';
    mensaje.style.color = 'red';

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('correo').value.trim();
    const tipoTarjeta = document.getElementById('tipo-tarjeta').value;
    const numTarjeta = document.getElementById('numero-tarjeta').value.replaceAll(' ','').trim();
    const titular = document.getElementById('titular-tarjeta').value.trim();
    const fechaCaducidad = document.getElementById('fecha-expiracion').value;
    const cvv = document.getElementById('cvv').value.trim();

    if (nombre.length < 3) return mostrarError('El nombre completo debe tener al menos 3 caracteres.');
    if (!validarEmail(email)) return mostrarError('El correo electrónico no es válido.');
    if (!tipoTarjeta) return mostrarError('Selecciona un tipo de tarjeta.');
    if (!validarNumTarjeta(numTarjeta)) return mostrarError('El número de tarjeta debe tener 13, 15, 16 o 19 dígitos.');
    if (titular.length < 3) return mostrarError('El titular debe tener al menos 3 caracteres.');
    if (!fechaValida(fechaCaducidad)) return mostrarError('La fecha de caducidad debe ser futura.');
    if (!/^\d{3}$/.test(cvv)) return mostrarError('El CVV debe tener exactamente 3 dígitos.');

    modo.style.display = 'flex';
    form.reset();
  });

  cerrarmodo.addEventListener('click', () => {
    modo.style.display = 'none';
    window.location.href = '../ejs/index.html';
  });

  botonBorrar.addEventListener('click', function() {
  form.reset();
  mensaje.textContent = '';
  });

  function mostrarError(msg) {
    mensaje.textContent = msg;
    mensaje.style.color = 'red';
  }

  function validarEmail(email) {
    const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function validarNumTarjeta(num) {
    return /^(\d{13}|\d{15}|\d{16}|\d{19})$/.test(num);
  }

  function fechaValida(fechaCad) {
    if (!fechaCad) return false;
    const [anio, mes] = fechaCad.split('-');
    const fecha = new Date(parseInt(anio), parseInt(mes) - 1);
    const ahora = new Date();
    return (fecha.getFullYear() > ahora.getFullYear() ||
            (fecha.getFullYear() === ahora.getFullYear() && fecha.getMonth() >= ahora.getMonth()));
  }
});

