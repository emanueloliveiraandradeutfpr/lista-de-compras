export class ProductSaveService {
    constructor() {}

    // Constante para a chave do armazenamento local
    LOCAL_STORAGE_KEY = 'itens';

    saveLocal(product) {
        // Obtendo relatórios do armazenamento local
        let products = localStorage.getItem(this.LOCAL_STORAGE_KEY);

        // Verificando se há relatórios existentes
        products = products ? JSON.parse(products) : [];

        // Adicionando o novo relatório ao array
        products.push(product);

        // Salvando os relatórios atualizados no armazenamento local
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(products));

        // Retornando os relatórios atualizados
        return products;
    }
}
