import 'index.css'; // Importa o CSS para aplicar estilos
import { getRecipeById } from '/Services/apiService.js'; // Reutilizamos a função
import { createRecipeModalContent } from '/Components/RecipeModal.js'; // Reutilizamos o componente do modal

const sortearBtn = document.getElementById('sortear-btn');
const receitaContainer = document.getElementById('receita-container');

async function sortearReceita() {
    receitaContainer.innerHTML = '<p class="text-center">Sorteando...</p>';

    // A API de "random" na verdade retorna um array com 1 receita
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const recipe = data.meals ? data.meals[0] : null;

    if (recipe) {
        // Reutilizamos a função que cria o conteúdo do modal para exibir a receita completa
        const recipeHtml = createRecipeModalContent(recipe);
        receitaContainer.innerHTML = `
            <div class="bg-gray-50 p-6 rounded-lg shadow-xl">
                ${recipeHtml}
            </div>
        `;
    } else {
        receitaContainer.innerHTML = '<p class="text-center text-red-500">Erro ao sortear a receita. Tente novamente.</p>';
    }
}

sortearBtn.addEventListener('click', sortearReceita);