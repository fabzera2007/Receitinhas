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
            recipeElement.className = 'recipe-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden';
            recipeElement.setAttribute('data-id', recipe.idMeal);
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
        // Função para buscar detalhes de uma receita pelo ID
        async function getRecipeById(id) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                return data.meals ? data.meals[0] : null;
            } catch (error) {
                return null;
            }
        }
    
        // Função para mostrar um modal simples com detalhes da receita
        function showModal(recipe) {
            // Remove modal antigo se existir
            const oldModal = document.getElementById('recipe-modal');
            if (oldModal) oldModal.remove();
    
            const modal = document.createElement('div');
            modal.id = 'recipe-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
    
            modal.innerHTML = `
                <div style="background:#fff;max-width:500px;width:90%;padding:24px;border-radius:8px;position:relative;">
                    <button id="close-modal" style="position:absolute;top:8px;right:12px;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>
                    <h2 style="margin-bottom:12px;">${recipe.strMeal || ''}</h2>
                    ${recipe.strMealThumb ? `<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" style="width:100%;border-radius:8px;margin-bottom:12px;">` : ''}
                    <p style="margin-bottom:12px;"><strong>Categoria:</strong> ${recipe.strCategory || ''}</p>
                    <p style="margin-bottom:12px;"><strong>Origem:</strong> ${recipe.strArea || ''}</p>
                    <p style="margin-bottom:12px;">${recipe.strInstructions || ''}</p>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('close-modal').onclick = () => modal.remove();
            modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        }
    
        // Clique nos cards de receita
recipesContainer.addEventListener('click', async (event) => {
    const card = event.target.closest('.recipe-card');
    if (card && card.dataset.id) {
        const recipeId = card.dataset.id;
        try {
            showModal({ strMeal: 'Carregando receita...', strInstructions: 'Por favor, aguarde...' });
            const recipeDetails = await getRecipeById(recipeId);
            if (recipeDetails) {
                showModal(recipeDetails);
            } else {
                showModal({ strMeal: 'Erro', strInstructions: 'Não foi possível encontrar os detalhes desta receita.' });
            }
        } catch (error) {
            console.error('Falha ao buscar detalhes da receita:', error);
            showModal({ strMeal: 'Erro de Conexão', strInstructions: 'Não foi possível carregar a receita. Verifique sua conexão.' });
        }
    }
});

    // Carrega uma receita aleatória ao iniciar
    fetchRandomRecipe();
});     