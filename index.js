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
async function getRecipes() {
  try {
  const response = await fetch("http://127.0.0.1:5500/recipes.js");
  //stockage des recettes dans une variable recipes
  const recipes = await response.json();
  console.table(recipes);
  // retourne les recipes dans le tableau recipes
  return recipes.recipes;
  } 
  catch (error) {
  console.error(error);
  }
}

//recuperer la recette et l'afficher dans le DOM
async function getRecipe() {
  try {
    const recipes = await getRecipes();
    const grid = document.querySelector(".grid-container");
    grid.innerHTML = "";
//pour chaque recette on appelle la factory que l'on stocke dans la variable recipeDetail et on applique la methode getRecipeDOM
    recipes.forEach(recipe => {
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


