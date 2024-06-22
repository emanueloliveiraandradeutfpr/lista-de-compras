$(function loadAndDisplayProducts() {
    // Obtém os produtos do localStorage
    const products = JSON.parse(localStorage.getItem('itens')) || [];

    // Obtém a referência ao da lista no HTML
    const productList = $('.container');

    // Obtém o modelo do card
    const cardModel = document.querySelector('#card-model');

    productList.html('');

    // Itera sobre os relatórios e os adiciona à lista no HTML
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const clonedCard = cardModel.cloneNode(true);
        clonedCard.querySelector('.title').textContent = product.name;
        clonedCard.querySelector('#img').src = product.thumbnail;
        clonedCard.querySelector('.price').textContent = `R$${product.price}`;
        clonedCard.querySelector('.store-name').textContent = product.store.NAME;
        clonedCard.querySelector('.store-address').textContent = product.store.ENDERECO;
        clonedCard.querySelector('.brand').textContent = product.brand;

        productList.append(clonedCard);
    }
});
