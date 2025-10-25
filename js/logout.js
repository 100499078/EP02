document.addEventListener("DOMContentLoaded", () => {
    const btnLogout = document.querySelector(".sidebar.logout");
    const mode = document.getElementById("mode-logout");
    const confirmBtn = document.getElementById("btn-confirmLogout");
    const cancelBtn = document.getElementById("btn-cancelLogout");

    // Mostrar el modo de confirmación al hacer clic en el botón de cerrar sesión
    btnLogout.addEventListener("click", () => {
        mode.style.display = "flex"; // Centrar el contenido
    });

    // Cerrar el modo al hacer click en Cancelar
    cancelBtn.addEventListener("click", () => {
        mode.style.display = "none";
    });

    // Confirmar cierre de sesión
    confirmBtn.addEventListener("click", () => {
        sessionStorage.clear();
        localStorage.clear();

        window.location.href = "index.html";
    });

    window.addEventListener("click", (e) => {
        if (e.target === mode) {
            mode.style.display = "none";
        }
    });
});