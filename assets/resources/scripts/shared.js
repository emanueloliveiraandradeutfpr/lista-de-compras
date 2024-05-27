$(function () {
    let isLogeedIn = true;

    let menu = isLogeedIn
        ? '/lista-de-compras/menu.html'
        : '/lista-de-compras/menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('/lista-de-compras/footer.html');
});
