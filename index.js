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
  "use strict";
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

//VARIABLES
//tableau de recettes
let recipesTab=[];
//  Barrre de recherche principale
const searchInput = document.getElementById("searchInput");
//container de toutes les recettes
const grid = document.querySelector(".grid-container");
//Barrre de recherche secondaire ingrédients 
const searchInputTagIngredient = document.getElementById("searchInputTagIngredient");
//liste des ingrédients
let allIngredients = [];
const ingredientsList = document.querySelector("#ingredients");
const ul = document.createElement("ul");
const li = document.querySelectorAll("li");
const chevron = document.querySelector("#chevron");

//********BARRE DE RECHERCHE PRINCIPALE********//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//PROBLEME : la liste des ingredients ne se mets pas à jour en meme temps que la recherche mais les tags sont à jour et affichent les ingredients qui sont = value

//faire un addEventListener sur la valeur de l'input searchInput 
//-si input.length >= 3 alors on filtre les recettes en filtrant la valeur de l'input dans le nom, la description et les ingredients. 
//-si le champs est vide on affiche toutes les recettes, 
//-si le champs a une valeur qui correspond à une recette on affiche la ou les recettes, et on stock le resultat dans une variable appelée InputResult qui sera utilisée pour le tri des ingredients
//-si le champs a une valeur qui ne correspond à aucune recette on affiche un message d'erreur 
let inputResult = "";
let ingredientsTab = [];

searchInput.addEventListener("input", function() {
  const input = searchInput.value.trim().toLowerCase();
  
  if (input.length >= 3) {
    // Vérifier si le texte entré correspond à un ingrédient
    ingredientsTab = [];
    for (const recipe of recipesTab) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(input)) {
          if (!ingredientsTab.includes(ingredient.ingredient)) {
            ingredientsTab.push(ingredient.ingredient);
          }
        }
      }
    }
    
    const result = recipesTab.filter(recipe =>
      recipe.name.toLowerCase().includes(input) ||
      recipe.description.toLowerCase().includes(input) ||
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input)
      )
    );
    if (result.length > 0) {
      displayResults(result); // affiche les résultats filtrés
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
      // const error = document.createElement("p");
      // error.textContent = "Aucune recette ne correspond à votre critère de recherche";
      // grid.appendChild(error);
    }
  } else if (input.length === 0) {
    ingredientsTab = [];
    displayResults(recipesTab);
  }
  
  console.log(ingredientsTab);
});


//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE DANS GRID//
function displayResults(results){
  grid.innerHTML = "";
  results.forEach(recipe => {
    const recipeDetail = recipeFactory(recipe);
    const recipeElement = recipeDetail.getRecipeDOM();
    grid.appendChild(recipeElement);
  }); 
}



//////////////////////////////////////////////////
//********BARRE DE RECHERCHE INGREDIENTS********//
//PROBLEME : les recettes sont filtrées que lorque l'on saisi dans l'input, mais pas au clic sur le tag. la liste des ingredients ne se met pas à jour
//et n'afficher que les recettes qui contiennent les ingredients recherchés

searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value;
  if (input.length >= 3) {
    //
    const result = recipesTab.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
        )
        );
        console.log(result);
        displayResults(result); // affiche les résultats filtrés
      } else {
        displayResults(recipesTab); // affiche toutes les recettes si la recherche est vide
      }  
}); 

//recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
async function getIngredients() {
  try {
    recipesTab = await getRecipes();
    const ingredientsList = document.querySelector("#ingredients");
    ingredientsList.appendChild(ul);
    recipesTab.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        //console.log(ingredient.ingredient);
        if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
          allIngredients.push(ingredient.ingredient.toLowerCase());
          const li = document.createElement("li");
          li.innerHTML = `<strong>${ingredient.ingredient}`;
          ul.appendChild(li);
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

//afficher la liste des ingredients au click sur le chevron 
//PROBLEME d'affichage à resoudre
chevron.addEventListener("click", function() {
  const ul = document.querySelector("ul");
  if (chevron.classList.contains("rotated")) {
    chevron.classList.remove("rotated");
    searchInputTagIngredient.style.display = "none";
    ul.style.display = "none";
  } else {
    chevron.classList.add("rotated");
    ingredientsList.classList.toggle('expanded');
    searchInputTagIngredient.style.display = "block";
    ul.style.display = "block";
  }
});


//filtrer les ingredients dans la div #ingredients en meme temps que la recherche principale
//ne fonctionne pas
//boucle avec li ou ingredient ?
searchInput.addEventListener("input", function() {
  const input = searchInput.value;
  li.forEach(ingredient => {
    if (ingredient.textContent.toLowerCase().includes(input.toLowerCase())) {
      ingredient.style.display = "block";
    } else {
      ingredient.style.display = "none";
    }
  });
});


//***********LES TAGS ****************//

//creer un tag avec l'ingredient saisi dans input et n'afficher que les recettes qui contiennent les ingredients recherchés avec la methode inlcudes pour filtrer les elements saisis dans l'input    
//trim pour supprimer les espaces avant et apres le texte de chaque li
const tags = document.querySelector("#tags");
function createTag(inputValue){
  const li = document.querySelectorAll("#ingredients li");
  if (inputValue.trim() === '' || inputValue.length < 3) { // Vérifier si la valeur de l'input est vide ou 3 caractères
    tags.style.display = 'none'; // Cacher les tags
    return;
  } else {
    tags.style.display = 'block'; // Afficher les tags
  }
  tags.innerHTML = ''; // Réinitialiser les tags existants
  li.forEach(ingredient => {
    //const selectedIngredients = [];
    const ingredientName = ingredient.textContent.trim().toLowerCase();
    if (ingredientName.includes(inputValue)) {
      const tag = document.createElement("span"); // Ajouter le tag correspondant
      tag.innerHTML = `<strong>${ingredientName}</strong>`;
      const closeBtn = document.createElement("i");
      closeBtn.innerHTML = "❌";
      tag.classList.add("selected");
      tags.appendChild(tag);
      tags.appendChild(closeBtn);
      //selectedIngredients.push(ingredientName);
    }
  });
}
searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value.toLowerCase();
  createTag(input);
});
searchInput.addEventListener("input", function() {
  const input = searchInput.value.toLowerCase();
  createTag(input);
}
);

//selectionner l'ingredient dans la liste et l'afficher dans le tag
//affichage dans grid ok
ingredientsList.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    const ingredient = e.target.textContent.trim().toLowerCase();
    createTag(ingredient);
    const tags = document.querySelectorAll('.selected');
    const values = [];
    tags.forEach(tag => {
      values.push(tag.textContent);
    });
    const result = recipesTab.filter(recipe => {
      return values.every(value => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase())));
    });
    if (values.length > 0) {
      displayResults(result);
    } else {
      displayResults(recipesTab);
    }
  }
});


//supprimer le tag en cliquant sur la croix et mettre à jour l'affichage des recettes
//ok
tags.addEventListener("click", function(e) {
  if (e.target.tagName === "I") {
    e.target.previousElementSibling.remove();
    e.target.remove();
    displayResults(recipesTab);
  }
}
);

//au clic sur searchInputTagIngredient mettre en display block  
// searchInputTagIngredient.addEventListener("click", function() {
//   ingredientsList.style.display = "block";
// }
// );
