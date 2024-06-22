import Product from '/lista-de-compras/model/product.js';
import { ProductSaveService } from '/lista-de-compras/service/productSave.service.js';
import { Superpão } from '/lista-de-compras/model/store.js';
export default async function postData(id) {
    let token = '2070bd3d83mshe37ab76e58a71a2p1574a2jsn97e6c6325782';

    //const url = `https://go-upc-product-lookup.p.rapidapi.com/code/${id}`;
    const url = `https://api.cosmos.bluesoft.com.br/gtins/${id}`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': token,
            // 'x-rapidapi-host': 'go-upc-product-lookup.p.rapidapi.com',
            'X-Cosmos-Token': 'g7oRjF9hCbu5YdQ1R5HO-g',
            'User-Agent': 'Cosmos-API-Request',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let product = new Product(
            result.description,
            result.gtin,
            (
                Math.random() * (result.max_price - result.min_price) +
                result.min_price
            ).toFixed(2),
            result.thumbnail,
            result.brand,
            Superpão,
            result?.barcode_image,
        );
        let storage = new ProductSaveService();
        storage.saveLocal(product);
        console.log(result);
        $('#resultado').html(`oi ${result.description}`);
        return result;
    } catch (error) {
        console.error(error);
    }
}
