import { ListService } from '/lista-de-compras/service/list.service.js';
import { ProductService } from '/lista-de-compras/service/product.service.js';

function loadAndDisplayProducts() {
    let user = localStorage.getItem('id');

    const productList = $('.list');
    let cardModel = document.querySelector('#card-model');
    let listHeader = $('.list-name').clone(true);
    $('#user-spinner').hide();

    productList.html('');

    if (user) {
        let button = $('.add-cart');
        const products = new ListService();
        products.getMyLists(user).then((result) => {
            for (let i = 0; i < result.lists.length; i++) {
                const list = result.lists[i];
                console.log(list.id);
                products.getProductsInList(list.id).then(
                    (result) => {
                        // Itera sobre os relatórios e os adiciona à lista no HTML
                        for (let i = 0; i < result.products.length; i++) {
                            const product = result.products[i];
                            const clonedCard = cardModel.cloneNode(true);
                            button.clone(true).removeClass('hide').appendTo(clonedCard);
                            clonedCard.querySelector('.id').textContent = product.id;
                            clonedCard.querySelector('.barcode').src =
                                product.barcode_image;
                            clonedCard.querySelector('.title').textContent = product.name;
                            clonedCard.querySelector('.gtin').textContent = product.gtin;
                            clonedCard.querySelector(
                                '.price',
                            ).textContent = `R$${product.price}`;
                            clonedCard.querySelector('#img').src = product.image;
                            clonedCard.querySelector('.brand').textContent =
                                product.brand;
                            clonedCard.querySelector('.store-name').textContent =
                                product.store.NAME;
                            clonedCard.querySelector('.store-address').textContent =
                                product.store.ENDERECO;
                            console.log(product);
                            clonedCard.querySelector('.list-name').textContent =
                                list.name;
                            productList.append(clonedCard);
                        }
                    },
                    (error) => {
                        let msg = String(error).split('  ');
                        alertify.error(msg[0]);
                        alertify.error('Try again later');
                        $('#user-spinner').hide();
                        $('#no-result').show();
                    },
                );
            }
        });
    } else {
        $('#no-result').show();

        alertify.error('Precisa estar logado');
    }
}

$(loadAndDisplayProducts());
$('.add-cart').on('click', function () {
    let card = $(this.parentElement);

    let product = new ProductService();
    product.deleteProducts(card[0].querySelector('.id').textContent).then(() => {
        alertify.success('Removido com sucesso');
        loadAndDisplayProducts();
    });
});
$('#list-create-form').on('submit', function (event) {
    event.preventDefault();
    let data = {};
    data.name = $('#list-name').val();
    data.userId = localStorage.getItem('id');
    const products = new ListService();
    products.createList(data).then(() => {
        alertify.success('Criado com sucesso');
    });
});
