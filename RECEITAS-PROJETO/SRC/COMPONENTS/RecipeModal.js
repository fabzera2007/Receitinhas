/**
 * Cria e retorna o conteúdo HTML para o modal de detalhes da receita.
 * @param {Object} recipe - O objeto completo da receita.
 * @returns {string} Uma string HTML com o conteúdo do modal.
 */
export function createRecipeModalContent(recipe) {
    // Monta a lista de ingredientes e medidas
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li class="text-gray-700 dark:text-gray-300">${measure} ${ingredient}</li>`;
        }
    }

    // Retorna o HTML completo do conteúdo do modal
    return `
        <button id="modal-close-btn" class="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-3xl">&times;</button>
        <div class="p-6 md:p-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-64 object-cover rounded-md mb-6">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="md:col-span-1">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Ingredientes</h3>
                    <ul class="list-disc list-inside space-y-1">${ingredientsList}</ul>
                </div>
                <div class="md:col-span-2">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Instruções</h3>
                    <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${recipe.strInstructions}</p>
                </div>
            </div>
             ${recipe.strYoutube ? `<a href="${recipe.strYoutube}" target="_blank" class="inline-block bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Ver Vídeo no YouTube</a>` : ''}
        </div>
    `;
}