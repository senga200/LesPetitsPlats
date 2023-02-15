//test fetch 
// fetch("http://127.0.0.1:5500/recipes.js")
//   .then(response => response.json())
//   .then(recipes => {
//     console.table(recipes);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// recuperer les recettes à partir de recipes.js et retourner un tableau de recettes

let recipesTab=[];

async function getRecipes() {
  try {
  const response = await fetch("http://127.0.0.1:5500/recipes.json");
  //stockage des recettes dans une variable recipes
  const recipesTab = await response.json();
  console.table(recipesTab);
  // retourne les recipes dans le tableau recipes
  return recipesTab.recipes;
  } 
  catch (error) {
  console.error(error);
  }
}

//recuperer la recette et l'afficher dans le DOM
async function getRecipe() {
  try {
    recipesTab = await getRecipes();
    const grid = document.querySelector(".grid-container");
    grid.innerHTML = "";
//pour chaque recette on appelle la factory que l'on stocke dans la variable recipeDetail et on applique la methode getRecipeDOM
    recipesTab.forEach(recipe => {
      const recipeDetail = recipeFactory(recipe);
      const recipeElement = recipeDetail.getRecipeDOM();
      grid.appendChild(recipeElement);
    });
  } catch (error) {
    console.error(error);
  }
}
//charger la recette  
getRecipe();


// barre de recherche
const searchInput = document.getElementById("searchInput");
const suggestionsElement = document.getElementById("suggestions");


getRecipes().then(recipes => {
  recipesTab = recipes;
});


searchInput.addEventListener("input", function() {
  const input = searchInput.value;
  if (input.length >= 3) {
    const result = recipesTab.filter(recipe =>
      recipe.name.toLowerCase().includes(input.toLowerCase()) ||
      recipe.description.toLowerCase().includes(input.toLowerCase()) ||
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
      )
    );
    let suggestions = "";
    if (input !== "") {
      result.forEach(recipe =>
        (suggestions += `<div class="suggestions">${recipe.name}</div>`)
      );
    }
    console.log(result)
    suggestionsElement.innerHTML = suggestions;
  } else {
    suggestionsElement.innerHTML = "";
  }
});