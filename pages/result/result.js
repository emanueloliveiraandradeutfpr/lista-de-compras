import getData from '/lista-de-compras/service/quagga.service.js';
import { ProductService } from '/lista-de-compras/service/product.service.js';
import { Superpão } from '/lista-de-compras/model/store.js';
import Product from '/lista-de-compras/model/product.js';

$(function loadAndDisplayProducts() {
    let user = localStorage.getItem('id');
    let searchKey = localStorage.getItem('searchKey');

    const productList = $('.list');
    let cardModel = document.querySelector('#card-model');
    $('#user-spinner').hide();

    let button = $('.add-cart');
    productList.html('').hide();

    if (searchKey) {
        let results = getData(searchKey);
        results.then(
            (result) => {
                // Itera sobre os relatórios e os adiciona à lista no HTML
                for (let i = 0; i < result.products.length; i++) {
                    let product = result.products[i];

                    const clonedCard = cardModel.cloneNode(true);
                    button.clone(true).removeClass('hide').appendTo(clonedCard);

                    clonedCard.querySelector('.barcode').src = product.barcode_image;
                    clonedCard.querySelector('.title').textContent = product.description;
                    clonedCard.querySelector('.gtin').textContent = product.gtin;
                    clonedCard.querySelector('.price').textContent = `R$${(
                        Math.random() * (product?.max_price - product?.min_price) +
                        product?.min_price
                    ).toFixed(2)}`;
                    clonedCard.querySelector('#img').src = product?.thumbnail;
                    clonedCard.querySelector('.brand').textContent = product.brand
                        ? product.brand.name
                        : 'Não cadastrado';
                    clonedCard.querySelector('.store-name').textContent = Superpão.NAME;
                    clonedCard.querySelector('.store-address').textContent =
                        Superpão.ENDERECO;
                    console.log(product);
                    productList.append(clonedCard);

                    productList.fadeIn(4000);
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
    } else {
        $('#no-result').show();
        alert('Sem chave de busca');
    }
});

$('button').on('click', function () {
    let card = $(this.parentElement);
    const produtoService = new ProductService();

    let produto = new Product(
        card[0].querySelector('.title').textContent,
        card[0].querySelector('.gtin').textContent,
        card[0].querySelector('.price').textContent,
        card[0].querySelector('#img').src,
        card[0].querySelector('.brand').textContent,
        Superpão,
        card[0].querySelector('.barcode').src,
    );
    let user_id = localStorage.getItem('id');
    produto.userId = user_id;
    produtoService.insertProductWithFetch(produto).then(() => {
        alertify.success('Cadatrado com sucesso');
    });
});
