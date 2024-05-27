setTimeout(() => {
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });

    let aux = $('.dropdown-trigger');
    aux.dropdown();
}, 500);
