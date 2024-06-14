$(function () {
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });
    console.log('Oi');

    let aux = $('.dropdown-trigger');
    aux.dropdown();
});
$(function () {
    let isLogeedIn = true;

    let menu = isLogeedIn ? '../menu.html' : '../menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('../footer.html');
    console.log('Oi');

    window.setTimeout(function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});

        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});

        // elems = document.querySelectorAll('.modal');
        // M.Modal.init(elems, {});
    }, 1000);
});
