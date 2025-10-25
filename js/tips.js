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
        const ultimosTres = consejos.slice(-3).reverse();
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

        if (titulo === "" || texto === "")  return;

        const nuevoConsejo = {
            id: Date.now(),
            titulo,
            texto,
            fecha: new Date().toISOString()
        };

        const consejos = JSON.parse(localStorage.getItem("consejos")) || [];
        consejos.push(nuevoConsejo);
        localStorage.setItem("consejos", JSON.stringify(consejos));

        // Limpiar el forms
        form.reset();

        // Actualizar la lista de consejos
        mostrarUltimosConsejos();
    });

    // Mostrar los consejos al cargar la página
    mostrarUltimosConsejos();
});