//test fetch 
// fetch("http://127.0.0.1:5500/recipes.js")
//   .then(response => response.json())
//   .then(recipes => {
//     console.table(recipes);
//   })
//   .catch(error => {
//     console.error(error);
//   });





async function getRecipe() {
    try {
      const recipes = await getRecipes();
      const grid = document.querySelector(".grid-container");
      const recipeContainer = grid.querySelector(".recette_container");
      recipes.forEach(recipe => {
        const recipeDetail = recipeFactory(recipe);
        const recipeElement = recipeDetail.getRecipeDOM();
        recipeContainer.appendChild(recipeElement);
      });
    } catch (error) {
      console.error(error);
    }
  }
    getRecipe();
    
async function getRecipes() {
    try {
    const response = await fetch("http://127.0.0.1:5500/recipes.js");
    const recipes = await response.json();
    console.log(recipes);
    return recipes.recipes;
    } 
    catch (error) {
    console.error(error);
    }
}
    
// function recipeFactory(data) {
//     const { name, time, ingredients, description } = data;
//     function getRecipeDOM() {
//         const gridContainer = document.querySelector(".grid-container")
//       const recipeContainer = document.createElement("div");
//       recipeContainer.classList.add("recette_container");
//       recipeContainer.style.border = "red solid";

//       const photo = document.createElement("div");
//       photo.classList.add("photo-recette");
//       const img = document.createElement("img");
//       img.src = "cuisine.jpg";
//       img.alt = "";
//       photo.appendChild(img);
//       recipeContainer.appendChild(photo);
  
//       const title = document.createElement("div");
//       title.classList.add("titre_recette");
//       const h2 = document.createElement("h2");
//       h2.textContent = name;
//       title.appendChild(h2);
//       const span = document.createElement("span");
//       span.classList.add("temps");
//       span.innerHTML = `<i class="fas fa-regular fa-clock"></i>${time}`;
//       title.appendChild(span);
//       recipeContainer.appendChild(title);
  
//       const descriptionContainer = document.createElement("div");
//       descriptionContainer.classList.add("description_recette");
  
//       const ingredientsList = document.createElement("div");
//       ingredientsList.classList.add("ingredients_recette");
//       ingredients.forEach(ingredient => {
//         const li = document.createElement("li");
//         li.textContent = ingredient;
//         ingredientsList.appendChild(li);
//       });
//       descriptionContainer.appendChild(ingredientsList);
  
//       const recipe = document.createElement("div");
//       recipe.classList.add("recette");
//       const p = document.createElement("p");
//       p.textContent = description;
//       gridContainer.appendChild(recipeContainer);
//       recipe.appendChild(p);
//       descriptionContainer.appendChild(recipe);
  
//       recipeContainer.appendChild(descriptionContainer);
  
//       return recipeContainer;
//     }
//     return { name, getRecipeDOM };
//   }


   
function recipeFactory(data) {
    const { name, time, ingredients, description } = data;
    function getRecipeDOM() {
        const gridContainer = document.querySelector(".grid-container")
      const recipeContainer = document.createElement("div");
      recipeContainer.classList.add("recette_container");
      recipeContainer.style.border = "red solid";
      gridContainer.appendChild(recipeContainer);
      const photo = document.createElement("div");
      photo.classList.add("photo-recette");
      const img = document.createElement("img");
      img.src = "cuisine.jpg";
      img.alt = "";
      photo.appendChild(img);
      recipeContainer.appendChild(photo);
  
      const title = document.createElement("div");
      title.classList.add("titre_recette");
      const h2 = document.createElement("h2");
      h2.textContent = name;
      title.appendChild(h2);
      const span = document.createElement("span");
      span.classList.add("temps");
      span.innerHTML = `<i class="fas fa-regular fa-clock"></i>${time}`;
      title.appendChild(span);
      recipeContainer.appendChild(title);
  
      const descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("description_recette");
  
      const ingredientsList = document.createElement("div");
      ingredientsList.classList.add("ingredients_recette");
      ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
      descriptionContainer.appendChild(ingredientsList);
  
      const recipe = document.createElement("div");
      recipe.classList.add("recette");
      const p = document.createElement("p");
      p.textContent = description;

      recipe.appendChild(p);
      descriptionContainer.appendChild(recipe);
  
      recipeContainer.appendChild(descriptionContainer);
  
      return recipeContainer;
    }
    return { name, getRecipeDOM };
  }
