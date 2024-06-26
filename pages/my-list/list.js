import { ProductService } from '/lista-de-compras/service/product.service.js';

$(function loadAndDisplayProducts() {
    let user = localStorage.getItem('id');

    const productList = $('.list');
    let cardModel = document.querySelector('#card-model');
    $('#user-spinner').hide();

    productList.html('');

    if (user) {
        let button = $('.add-cart');
        const products = new ProductService();
        products.listProducts().then((result) => {
            // Itera sobre os relatórios e os adiciona à lista no HTML
            for (let i = 0; i < result.length; i++) {
                const product = result[i];

                const clonedCard = cardModel.cloneNode(true);
                button.clone(true).removeClass('hide').appendTo(clonedCard);

                clonedCard.querySelector('.id').textContent = product.id;
                clonedCard.querySelector('.barcode').src = product.barcode_image;
                clonedCard.querySelector('.title').textContent = product.name;
                clonedCard.querySelector('.gtin').textContent = product.gtin;
                clonedCard.querySelector('.price').textContent = `R$${product.price}`;
                clonedCard.querySelector('#img').src = product.image;
                clonedCard.querySelector('.brand').textContent = product.brand
                    ? product.brand?.name
                    : 'Não cadastrado';
                clonedCard.querySelector('.store-name').textContent = product.store.NAME;
                clonedCard.querySelector('.store-address').textContent =
                    product.store.ENDERECO;
                console.log(product);

                productList.append(clonedCard);
            }
        });
    } else {
        $('#user-spinner').hide();
        if (user == null) {
            $('#no-result').show();
        } else {
            $('#no-result').hide();
        }
        alert('Precisa estar logado');
    }
});

$('button').on('click', function () {
    let card = $(this.parentElement);

    let product = new ProductService();
    product.deleteProducts(card[0].querySelector('.id').textContent).then(() => {
        alertify.success('Removido com sucesso');
        loadAndDisplayProducts();
    });
});
