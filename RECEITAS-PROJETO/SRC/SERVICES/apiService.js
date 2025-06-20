const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Busca receitas pelo nome.
 * @param {string} query - O nome da receita a ser buscada.
 * @returns {Promise<Array|null>} Uma lista de receitas ou null se não houver.
 */
export async function searchRecipesByName(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Erro ao buscar receitas por nome:', error);
        return null;
    }
}

/**
 * Busca uma receita específica pelo seu ID.
 * @param {string} id - O ID da receita.
 * @returns {Promise<Object|null>} O objeto da receita ou null.
 */
export async function getRecipeById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Erro ao buscar receita por ID:', error);
        return null;
    }
}

/**
 * Busca 10 receitas aleatórias (a API não tem um endpoint para várias, então chamamos a de uma receita 10x).
 * @returns {Promise<Array>} Uma lista de receitas aleatórias.
 */
export async function getRandomRecipes() {
    try {
        // A API gratuita não tem um endpoint para buscar várias receitas aleatórias.
        // Então, vamos chamar o endpoint de uma receita aleatória várias vezes.
        const recipePromises = Array.from({ length: 8 }, () => 
            fetch(`${API_BASE_URL}/random.php`).then(res => res.json())
        );

        const results = await Promise.all(recipePromises);
        return results.map(result => result.meals[0]);

    } catch (error) {
        console.error('Erro ao buscar receitas aleatórias:', error);
        return [];
    }
}