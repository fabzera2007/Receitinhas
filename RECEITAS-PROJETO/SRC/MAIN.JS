// src/main.js

import './index.css'; // <-- GARANTA QUE ESTA LINHA ESTEJA AQUI NO TOPO

import { searchRecipesByName, getRecipeById, getRandomRecipes } from './Services/apiService.js';
import { createRecipeCard } from './Components/RecipeCard.js';
import { createRecipeModalContent } from './Components/RecipeModal.js';

// ... resto do seu código ...

// --- SELETORES DO DOM ---
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipesGrid = document.getElementById('recipes-grid');
const mainTitle = document.getElementById('main-title');
const loadingIndicator = document.getElementById('loading-indicator');
const noResultsMessage = document.getElementById('no-results');
const modalContainer = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');

// --- FUNÇÕES ---

/** Exibe ou esconde o spinner de carregamento */
function toggleLoading(isLoading) {
    loadingIndicator.classList.toggle('hidden', !isLoading);
}
/** Limpa o grid e exibe uma lista de receitas */
function displayRecipes(recipes) {
    recipesGrid.innerHTML = '';
    noResultsMessage.classList.add('hidden');

    if (!recipes || recipes.length === 0) {
        noResultsMessage.classList.remove('hidden');
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesGrid.appendChild(recipeCard);
    });
}

/** Lida com a busca de receitas */
async function handleSearch(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    mainTitle.textContent = `Resultados para "${query}"`;
    toggleLoading(true);
    recipesGrid.innerHTML = ''; // Limpa grid antes de carregar
    noResultsMessage.classList.add('hidden');


    const recipes = await searchRecipesByName(query);
    
    toggleLoading(false);
    displayRecipes(recipes);
    searchInput.value = '';
}

/** Busca e exibe detalhes de uma receita no modal */
async function showRecipeDetails(recipeId) {
    modalContent.innerHTML = ''; // Limpa conteúdo antigo
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('opacity-100');
    modalContent.classList.add('scale-100');

    const recipe = await getRecipeById(recipeId);
    if (recipe) {
        const content = createRecipeModalContent(recipe);
        modalContent.innerHTML = content;
        
        // Adiciona evento ao botão de fechar do modal recém-criado
        document.getElementById('modal-close-btn').addEventListener('click', hideModal);
    }
}

/** Esconde o modal */
function hideModal() {
    modalContainer.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    setTimeout(() => {
        modalContainer.classList.add('hidden');
        modalContainer.classList.remove('opacity-100'); // Reseta para a próxima abertura
    }, 300); // Deve ser igual à duração da transição
}

/** Carrega receitas populares ao iniciar */
async function loadInitialRecipes() {
    toggleLoading(true);
    const recipes = await getRandomRecipes();
    toggleLoading(false);
    displayRecipes(recipes);
}

// --- EVENT LISTENERS ---

// Listener para o formulário de busca
searchForm.addEventListener('submit', handleSearch);

// Listener para abrir o modal ao clicar em um card
recipesGrid.addEventListener('click', (event) => {
    const card = event.target.closest('[data-recipe-id]');
    if (card) {
        const recipeId = card.dataset.recipeId;
        showRecipeDetails(recipeId);
    }
});

// Listener para fechar o modal clicando fora do conteúdo
modalContainer.addEventListener('click', (event) => {
    if (event.target.id === 'modal-container') {
        hideModal();
    }
});


// --- INICIALIZAÇÃO ---
// Carrega as receitas iniciais quando a página é carregada
document.addEventListener('DOMContentLoaded', loadInitialRecipes);