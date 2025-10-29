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
        window.location.href = '../ejs/indexC.html?pack=' + packNumber;
    });
});

