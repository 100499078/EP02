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