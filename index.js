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
        ? '/lista-de-compras/menu.html'
        : '/lista-de-compras/menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('/lista-de-compras/footer.html');

    window.setTimeout(function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});

        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});

        $(document).ready(function () {
            M.updateTextFields();
        });
    }, 1000);
});
