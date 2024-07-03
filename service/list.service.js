export class ListService {
    constructor() {}

    async getMyLists(id) {
        const url = `http://localhost:3000/users/${id}?_embed=lists`;
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
    async getProductsInList(id) {
        const url = `http://localhost:3000/lists/${id}?_embed=products`;
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
    async createList(data) {
        const url = `http://localhost:3000/lists`;
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
}
