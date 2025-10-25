document.addEventListener('DOMContentLoaded', () => {
    const tipsList = document.querySelector('.tips-list');
    const form = document.querySelector(".form-add-tip");
    const titleInput = document.querySelector(".sidebar-tip-title");
    const textInput = document.querySelector(".sidebar-tip-text");

    function mostrarUltimosConsejos() {
        tipsList.innerHTML = ""; //Limpiar la lista
        const consejos = JSON.parse(localStorage.getItem("consejos")) || [];

        if (consejos.length === 0) {
            tipsList.innerHTML = "<li>No hay consejos disponibles.</li>";
            return;
        }

        // Mostrar los últimos 3 consejos
        const ultimosTres = consejos.slice(0,3);
        ultimosTres.forEach((c) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = 'consejo.html?id=~${c.id}'; //Un ejemplo
            a.textContent = c.titulo;
            li.appendChild(a);
            tipsList.appendChild(li);
        });
    }

    // Guardar un nuevo consejo
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = titleInput.value.trim();
        const texto = textInput.value.trim();

        // Validaciones de los campos
        if (titulo.length < 15) {
            alert("El título debe tener al menos 15 caracteres.");
            return;
        }

        if (texto.length < 30) {
            alert("La descripción debe tener al menos 30 caracteres.");
            return;
        }

        const nuevoConsejo = {
            id: Date.now(),
            titulo,
            texto,
            fecha: new Date().toISOString()
        };

        const consejos = JSON.parse(localStorage.getItem("consejos")) || [];
        consejos.unshift(nuevoConsejo);
        localStorage.setItem("consejos", JSON.stringify(consejos));

        // Limpiar el forms
        form.reset();

        // Actualizar la lista de consejos
        mostrarUltimosConsejos();
    });

    // Mostrar los consejos al cargar la página
    mostrarUltimosConsejos();
});