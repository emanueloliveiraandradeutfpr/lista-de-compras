export class ProductService {
    constructor() {}

    async listAllProducts() {
        const url = `http://localhost:3000/products`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Erro HTTP! Status: ${response.status}: ${response.statusText}`,
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Propaga o erro para ser tratado externamente
        }
    }
    async listMyProducts(id) {
        const url = `http://localhost:3000/users/${id}?_embed=products`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Erro HTTP! Status: ${response.status}: ${response.statusText}`,
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Propaga o erro para ser tratado externamente
        }
    }

    async insertProductWithFetch(data) {
        const url = `http://localhost:3000/products`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteProducts(id) {
        const url = `http://localhost:3000/products/${id}`;
        const options = {
            method: 'DELETE',
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Erro HTTP! Status: ${response.status}: ${response.statusText}`,
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Propaga o erro para ser tratado externamente
        }
    }
}
