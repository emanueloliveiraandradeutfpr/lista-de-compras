import Product from '/lista-de-compras/model/product.js';
import { ProductSaveService } from '/lista-de-compras/service/productSave.service.js';
import { Superpão } from '/lista-de-compras/model/store.js';
export default async function postData(id) {
    let token = '2070bd3d83mshe37ab76e58a71a2p1574a2jsn97e6c6325782';

    const url = `https://go-upc-product-lookup.p.rapidapi.com/code/${id}`;
    //const url = `https://api.cosmos.bluesoft.com.br/gtins/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': token,
            'x-rapidapi-host': 'go-upc-product-lookup.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let product = new Product(
            result.product.name,
            18.0,
            result.product.imageUrl,
            result.product.brand,
            Superpão,
        );
        let storage = new ProductSaveService();
        storage.saveLocal(product);
        console.log(result);
        $('#resultado').html(`oi ${result.product.brand}`);
        return result;
    } catch (error) {
        console.error(error);
    }
}
