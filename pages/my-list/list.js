$(function loadAndDisplayProducts() {
    // Obtém os produtos do localStorage
    const products = JSON.parse(localStorage.getItem('items')) || [];

    // Obtém a referência ao da lista no HTML
    const productList = $('.list');

    // Obtém o modelo do card
    const cardModel = document.querySelector('#card-model');

    productList.html('');

    // Itera sobre os relatórios e os adiciona à lista no HTML
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const clonedCard = cardModel.cloneNode(true);
        clonedCard.querySelector('.barcode').src = product.barcode_image;
        clonedCard.querySelector('.title').textContent = product.name;
        clonedCard.querySelector('.gtin').textContent = product.gtin;
        clonedCard.querySelector('.price').textContent = `R$${product.price}`;
        clonedCard.querySelector('#img').src = product.image;
        clonedCard.querySelector('.brand').textContent = product.brand
            ? product.brand?.name
            : 'Não cadastrado';
        clonedCard.querySelector('.store-name').textContent = product.store.NAME;
        clonedCard.querySelector('.store-address').textContent = product.store.ENDERECO;
        console.log(product);

        productList.append(clonedCard);
    }
});
