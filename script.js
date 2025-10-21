$(document).ready(function() {
    let index = 0;
    const packs = $('.pack-item'); // Seleccionamos todos los elementos de la clase pack-item
    const totalPacks = packs.length;

    // Función para mostrar un pack específico y ocultar los demás
    function showPack(i) {
        packs.removeClass('activo');
        packs.eq(i).addClass('activo');
    }
    $('.button-right').click(function(){
        index = (index + 1) % totalPacks; // Incrementa el índice y vuelve al inicio si es necesario
        showPack(index);
    });
    $('button-left').click(function(){
        index = (index - 1 + totalPacks) % totalPacks; // Decrementa el índice y vuelve al final si es necesario
        showPack(index);
    })

    setInterval(function(){
        index = (index + 1) % totalPacks; // Incrementa el índice y vuelve al inicio si es necesario
        showPack(index);
    }, 2000); // Cambia de pack cada 2 segundos

    $('.btn-comprar').click(function(){
        const packNumber = $(this).data('pack');
        window.location.href = 'indexC/compra-pack' + packNumber + '.html';
    })
});