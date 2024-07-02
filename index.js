$(function () {
    let isLogeedIn = localStorage.getItem('id') ? true : false;

    let menu = isLogeedIn
        ? '/lista-de-compras/menu.html'
        : '/lista-de-compras/menu-anonimo.html';
    $('#menu').load(menu);
    $('#footer').load('/lista-de-compras/footer.html');

    window.setTimeout(function () {
        $('#list-anonimo').on('click', () => {
            alertify.error('Precisa estar logado!!!');
            let logar = confirm('Gostaria de logar?');
            if (logar) {
                window.location.href = '/lista-de-compras/pages/login/user.html';
            }
        });
        $('.sidenav').sidenav();
        $('.fixed-action-btn').floatingActionButton();
        $('.dropdown-trigger').dropdown();
        $('.tooltipped').tooltip();
        $('.sidenav').sidenav();
        $('select').formSelect();
        $('.collapsible').collapsible();

        $('input.autocomplete').autocomplete({
            data: {
                Arroz: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKvCrhtFVMIBXymizP0Wa3gD_X5YpsyRWhA&s',
                Feijao: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6E0uwPD5-L_Sj4vpI71pVhx2y69LqSbgYEQ&s',
                Carne: '/lista-de-compras/assets/resources/images/carne.jpeg',
                Omo: 'https://cdn-cosmos.bluesoft.com.br/products/7891038055208',
                'Old Spice': 'https://cdn-cosmos.bluesoft.com.br/products/7500435158688',
                'Old Spice': 'https://cdn-cosmos.bluesoft.com.br/products/7500435158688',
            },
            onAutocomplete: () => {
                localStorage.setItem('searchKey', $('input.autocomplete').val());
                window.location.href = '/lista-de-compras/pages/result/result.html';
            },
        });
        M.updateTextFields();

        $('.leave').on('click', () => {
            localStorage.removeItem('id');
            alertify.error('Saiu');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    }, 1000);
});
