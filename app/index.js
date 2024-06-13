$(function () {
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });

    let aux = $('.dropdown-trigger');
    aux.dropdown();
});

$(function () {
    let isLogeedIn = true;

    let menu = isLogeedIn ? '/app/menu.html' : '/app/menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('/app/footer.html');

    window.setTimeout(function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});

        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});

        // elems = document.querySelectorAll('.modal');
        // M.Modal.init(elems, {});
    }, 1000);
});
