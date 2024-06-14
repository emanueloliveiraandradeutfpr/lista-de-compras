$(function () {
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });
    let aux = $('.dropdown-trigger');
    aux.dropdown();
});
$(function () {
    let isLogeedIn = true;

    let menu = isLogeedIn
        ? `/${LISTA_DE_COMPRAS}/menu.html`
        : '/LISTA_DE_COMPRAS/menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('/LISTA_DE_COMPRAS/footer.html');

    window.setTimeout(function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});

        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});

        // elems = document.querySelectorAll('.modal');
        // M.Modal.init(elems, {});
    }, 1000);
});
