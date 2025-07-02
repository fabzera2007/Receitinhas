document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const recipesContainer = document.getElementById('recipes-container');
    const randomRecipeContainer = document.getElementById('random-recipe-container');
    const randomRecipeBtn = document.getElementById('random-recipe-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Função para buscar receitas variadas
    const fetchRecipes = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            const data = await response.json();
            displayRecipes(data.meals, recipesContainer);
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
            recipesContainer.innerHTML = '<p>Não foi possível carregar as receitas. Tente novamente mais tarde.</p>';
        }
    };

    // Função para buscar uma receita aleatória
    const fetchRandomRecipe = async () => {
        randomRecipeContainer.innerHTML = '<p>Carregando...</p>';
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            displayRecipes(data.meals, randomRecipeContainer, true);
        } catch (error) {
            console.error('Erro ao buscar receita aleatória:', error);
            randomRecipeContainer.innerHTML = '<p>Não foi possível carregar a receita. Tente novamente.</p>';
        }
    };

    // Função para exibir as receitas na tela
    const displayRecipes = (recipes, container, isSingle = false) => {
        container.innerHTML = '';
        if (!recipes) {
            container.innerHTML = '<p>Nenhuma receita encontrada.</p>';
            return;
        }

        const recipesToDisplay = isSingle ? recipes : recipes.slice(0, 12); // Limita a 12 na página inicial

        recipesToDisplay.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden';
            recipeElement.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-bold text-lg">${recipe.strMeal}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">${recipe.strCategory} | ${recipe.strArea}</p>
                    ${isSingle ? `<p class="mt-4">${recipe.strInstructions}</p>` : ''}
                </div>
            `;
            container.appendChild(recipeElement);
        });
    };

    // Navegação entre as abas
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            pages.forEach(page => {
                if (page.id === targetId) {
                    page.classList.remove('hidden');
                } else {
                    page.classList.add('hidden');
                }
            });
        });
    });

    // Botão de gerar receita aleatória
    randomRecipeBtn.addEventListener('click', fetchRandomRecipe);

    // Botão de alternar tema
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });

    // Carrega as receitas iniciais
    fetchRecipes();
});