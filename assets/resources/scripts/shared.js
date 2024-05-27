$(function () {
    let isLogeedIn = true;

    let menu = isLogeedIn ? '/menu.html' : '/menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('/footer.html');
});
