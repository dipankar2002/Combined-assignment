const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const FALLBACK_IMAGE = "https://via.placeholder.com/600x400/f4dbc0/6f5a44?text=Recipe";

const state = {
  items: [],
  selectedCuisine: "Italian",
  limit: 6,
  loading: false,
  error: ""
};

const cuisineSelect = document.getElementById("cuisineSelect");
const recipeLimitInput = document.getElementById("recipeLimit");
const searchBtn = document.getElementById("searchBtn");
const status = document.getElementById("status");
const recipeGrid = document.getElementById("recipeGrid");
const recipeCardTemplate = document.getElementById("recipeCardTemplate");
const recipeModal = document.getElementById("recipeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");

function setStatus(message, variant = "") {
  status.textContent = message;
  status.className = `status ${variant}`.trim();
}

function clearGrid() {
  recipeGrid.replaceChildren();
}

function parseLimit() {
  const n = Number(recipeLimitInput.value);
  if (!Number.isInteger(n) || n < 1) {
    return 1;
  }
  if (n > 12) {
    return 12;
  }
  return n;
}

function extractIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim());
    }
  }
  return ingredients;
}

function getCardDescription(recipe) {
  if (!recipe.instructions) {
    return "Tap for full ingredients and instructions.";
  }
  return `${recipe.instructions.slice(0, 115).trim()}...`;
}

function showRecipeDetails(recipe) {
  modalImage.src = recipe.image || FALLBACK_IMAGE;
  modalImage.alt = `${recipe.title} dish image`;
  modalTitle.textContent = recipe.title;
  modalMeta.textContent = `${recipe.cuisine} cuisine`;
  modalInstructions.textContent = recipe.instructions || "No instructions available.";

  modalIngredients.replaceChildren();
  const ingredients = extractIngredients(recipe);
  ingredients.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalIngredients.appendChild(li);
  });

  if (typeof recipeModal.showModal === "function") {
    recipeModal.showModal();
  }
}

function createCard(recipe, index) {
  const fragment = recipeCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".recipe-card");
  const image = fragment.querySelector(".recipe-image");
  const title = fragment.querySelector(".recipe-title");
  const description = fragment.querySelector(".recipe-description");
  const detailsBtn = fragment.querySelector(".details-btn");

  image.src = recipe.image || FALLBACK_IMAGE;
  image.alt = `${recipe.title} image`;
  title.textContent = recipe.title;
  description.textContent = getCardDescription(recipe);
  detailsBtn.addEventListener("click", () => showRecipeDetails(recipe));

  card.style.animationDelay = `${index * 50}ms`;
  return fragment;
}

function renderRecipes() {
  clearGrid();

  if (state.items.length === 0) {
    setStatus("No recipes found for this cuisine.", "err");
    return;
  }

  const fragment = document.createDocumentFragment();
  state.items.forEach((recipe, index) => {
    fragment.appendChild(createCard(recipe, index));
  });

  recipeGrid.appendChild(fragment);
  setStatus(`Showing ${state.items.length} recipes.`, "ok");
}

async function fetchRecipeDetails(id) {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error(`Could not load details for recipe ${id}.`);
  }

  const payload = await response.json();
  const meal = Array.isArray(payload.meals) ? payload.meals[0] : null;
  if (!meal) {
    throw new Error(`Recipe ${id} not found.`);
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    cuisine: meal.strArea || state.selectedCuisine,
    instructions: meal.strInstructions,
    strIngredient1: meal.strIngredient1,
    strIngredient2: meal.strIngredient2,
    strIngredient3: meal.strIngredient3,
    strIngredient4: meal.strIngredient4,
    strIngredient5: meal.strIngredient5,
    strIngredient6: meal.strIngredient6,
    strIngredient7: meal.strIngredient7,
    strIngredient8: meal.strIngredient8,
    strIngredient9: meal.strIngredient9,
    strIngredient10: meal.strIngredient10,
    strIngredient11: meal.strIngredient11,
    strIngredient12: meal.strIngredient12,
    strIngredient13: meal.strIngredient13,
    strIngredient14: meal.strIngredient14,
    strIngredient15: meal.strIngredient15,
    strIngredient16: meal.strIngredient16,
    strIngredient17: meal.strIngredient17,
    strIngredient18: meal.strIngredient18,
    strIngredient19: meal.strIngredient19,
    strIngredient20: meal.strIngredient20,
    strMeasure1: meal.strMeasure1,
    strMeasure2: meal.strMeasure2,
    strMeasure3: meal.strMeasure3,
    strMeasure4: meal.strMeasure4,
    strMeasure5: meal.strMeasure5,
    strMeasure6: meal.strMeasure6,
    strMeasure7: meal.strMeasure7,
    strMeasure8: meal.strMeasure8,
    strMeasure9: meal.strMeasure9,
    strMeasure10: meal.strMeasure10,
    strMeasure11: meal.strMeasure11,
    strMeasure12: meal.strMeasure12,
    strMeasure13: meal.strMeasure13,
    strMeasure14: meal.strMeasure14,
    strMeasure15: meal.strMeasure15,
    strMeasure16: meal.strMeasure16,
    strMeasure17: meal.strMeasure17,
    strMeasure18: meal.strMeasure18,
    strMeasure19: meal.strMeasure19,
    strMeasure20: meal.strMeasure20
  };
}

async function loadRecipes() {
  state.selectedCuisine = cuisineSelect.value;
  state.limit = parseLimit();
  state.loading = true;
  state.error = "";

  searchBtn.disabled = true;
  setStatus("Loading recipes...");

  try {
    const listResponse = await fetch(
      `${API_BASE_URL}/filter.php?a=${encodeURIComponent(state.selectedCuisine)}`
    );

    if (!listResponse.ok) {
      throw new Error(`Could not fetch recipes (status ${listResponse.status}).`);
    }

    const listPayload = await listResponse.json();
    const meals = Array.isArray(listPayload.meals) ? listPayload.meals : [];
    const selected = meals.slice(0, state.limit);

    const details = await Promise.all(
      selected.map((meal) => fetchRecipeDetails(meal.idMeal))
    );

    state.items = details;
    renderRecipes();
  } catch (error) {
    state.error = error.message || "Something went wrong while fetching recipes.";
    state.items = [];
    clearGrid();
    setStatus(state.error, "err");
  } finally {
    state.loading = false;
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", loadRecipes);
recipeLimitInput.addEventListener("change", () => {
  recipeLimitInput.value = String(parseLimit());
});

closeModalBtn.addEventListener("click", () => {
  recipeModal.close();
});

recipeModal.addEventListener("click", (event) => {
  const rect = recipeModal.getBoundingClientRect();
  const inDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!inDialog) {
    recipeModal.close();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setStatus("Pick a cuisine and click Find Recipes.");
});
