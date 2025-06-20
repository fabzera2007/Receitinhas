/**
 * Cria e retorna o elemento DOM para um card de receita.
 * @param {Object} recipe - O objeto da receita vindo da API.
 * @returns {HTMLElement} O elemento <div> do card.
 */
export function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer';
    
    // Adiciona o ID da receita ao dataset para fácil acesso
    card.dataset.recipeId = recipe.idMeal;

    card.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-40 object-cover">
        <div class="p-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-white truncate">${recipe.strMeal}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">${recipe.strArea || ''}</p>
        </div>
    `;
    return card;
}