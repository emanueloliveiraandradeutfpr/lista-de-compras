$(function () {
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });
    let aux = $('.dropdown-trigger');
    aux.dropdown();
});
$(function () {
    let isLogeedIn = true;

    let url = ${{vars.BASE_URL}}
    // let menu = isLogeedIn
    //     ? '${{ env.mascot }}/menu.html'
    //     : `${url}/menu-anonimo.html`;
    $('#menu').load(url);
    //$('#footer').load(`${env.BASE_URL}/footer.html`);

    window.setTimeout(function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});

        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});

        // elems = document.querySelectorAll('.modal');
        // M.Modal.init(elems, {});
    }, 1000);
});
