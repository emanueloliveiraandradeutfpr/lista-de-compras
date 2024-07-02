export default async function getData(id) {
    //let token = '2070bd3d83mshe37ab76e58a71a2p1574a2jsn97e6c6325782';

    //const url = `https://go-upc-product-lookup.p.rapidapi.com/code/${id}`;
    const url = `https://api.cosmos.bluesoft.com.br/products?query=${id}`;
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

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
