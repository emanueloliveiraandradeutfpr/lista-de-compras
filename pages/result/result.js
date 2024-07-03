import getData from '/lista-de-compras/service/quagga.service.js';
import { Superpão } from '/lista-de-compras/model/store.js';
import { Product } from '/lista-de-compras/model/product.js';
import { ListService } from '/lista-de-compras/service/list.service.js';
import { ProductService } from '/lista-de-compras/service/product.service.js';

$(function loadAndDisplayProducts() {
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
                for (let i = 0; i < result.length; i++) {
                    let product = result[i];

                    const clonedCard = cardModel.cloneNode(true);
                    button.clone(true).removeClass('hide').appendTo(clonedCard);

                    clonedCard.querySelector('.barcode').src = product.barcode_image;
                    clonedCard.querySelector('.title').textContent = product.description;
                    clonedCard.querySelector('.gtin').textContent = product.gtin;
                    clonedCard.querySelector('.price').textContent = (
                        Math.random() * (product?.max_price - product?.min_price) +
                        product?.min_price
                    ).toFixed(2);
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

$('.add-cart').on('click', function () {
    let user_id = localStorage.getItem('id');
    const listService = new ListService();
    let select = document.querySelector('#list-select');

    listService.getMyLists(user_id).then((result) => {
        for (let i = 0; i < result.lists.length; i++) {
            let list = result.lists[i];
            let option = document.querySelector('#list-select > option').cloneNode(true);
            $(option).removeAttr('disabled');
            option.textContent = list.name;
            option.value = list.id;
            select.append(option);
        }
        $('select').formSelect();
    });
    $('#list-create-form').on('submit', (event) => {
        event.preventDefault();

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
        produto.listId = $('#list-create-form').find(':selected').val();
        produtoService.insertProductWithFetch(produto).then(() => {
            alertify.success('Cadatrado com sucesso');
        });
    });
});
