export class ProductService {
    constructor() {}

    async listProducts() {
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

    /**
     * Inserção do paciente com Ajax.
     * @param {*} data
     * @returns
     */
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
            return null;
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
