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
            $('input.autocomplete').autocomplete({
                data: {
                    Arroz: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKvCrhtFVMIBXymizP0Wa3gD_X5YpsyRWhA&s',
                    Feijao: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6E0uwPD5-L_Sj4vpI71pVhx2y69LqSbgYEQ&s',
                    Carne: '/lista-de-compras/assets/resources/images/carne,jpeg',
                },
            });
        });
        $(document).ready(function () {
            M.updateTextFields();
        });
    }, 1000);
});
