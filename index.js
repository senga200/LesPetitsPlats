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
//et profiter pour vider le tableau pour afficher les resultats de la recherche

let recipesTab=[];

async function getRecipes() {
  try {
  const response = await fetch("recipes.json");
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

/////////////////////////////////////////////////
//********BARRE DE RECHERCHE PRINCIPALE********//
const searchInput = document.getElementById("searchInput");
//const suggestionsElement = document.getElementById("suggestions");

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
        console.log(result);
        displayResultsPrincipal(result); // affiche les résultats filtrés
      } else {
        displayResultsPrincipal(recipesTab); // affiche toutes les recettes si la recherche est vide
      }  
});

//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE PRINCIPALE//
const grid = document.querySelector(".grid-container");
function displayResultsPrincipal(results){
  grid.innerHTML = "";
  results.forEach(recipe => {
    const recipeDetail = recipeFactory(recipe);
    const recipeElement = recipeDetail.getRecipeDOM();
    grid.appendChild(recipeElement);
  }); 
}

//////////////////////////////////////////////////
//********BARRE DE RECHERCHE INGREDIENTS********//
//et n'afficher que les recettes qui contiennent les ingredients recherchés
const searchInputTagIngredient = document.getElementById("searchInputTagIngredient");
//const suggestionsElementIngredients = document.getElementById("suggestionsIngredients");

searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value;
  const li = document.querySelectorAll("li");
  li.forEach(ingredient => {
    if (ingredient.textContent.toLowerCase().includes(input.toLowerCase())) {
      ingredient.style.display = "block";
    } else {
      ingredient.style.display = "none";
    }
  });

  if (input.length >= 3) {
    const result = recipesTab.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
        )
        );
        console.log(result);
        displayResultsIngredients(result); // affiche les résultats filtrés
      } else {
        displayResultsIngredients(recipesTab); // affiche toutes les recettes si la recherche est vide
      }  
}); 

//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE INGREDIENTS
function displayResultsIngredients(results){
  const grid = document.querySelector(".grid-container");
  grid.innerHTML = "";
  results.forEach(recipe => {
    const recipeDetail = recipeFactory(recipe);
    const recipeElement = recipeDetail.getRecipeDOM();
    grid.appendChild(recipeElement);
  }); 
}

//recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
async function getIngredients() {
  try {
    recipesTab = await getRecipes();
    const ingredientsList = document.querySelector("#ingredients");
    let allIngredients = [];
    recipesTab.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        //console.log(ingredient.ingredient);
        if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
          allIngredients.push(ingredient.ingredient.toLowerCase());
          const li = document.createElement("li");
          li.innerHTML = `<strong>${ingredient.ingredient}`;
          ingredientsList.appendChild(li);
        }
      });
    });
   console.log("total ingrédients : ", allIngredients.length);

  } catch (error) {
    console.error(error);
  }
}
//charger la liste des ingredients
getIngredients();






