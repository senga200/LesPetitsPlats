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
const grid = document.querySelector(".grid-container");
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

/////////////////////////////////////////////////
//********BARRE DE RECHERCHE PRINCIPALE********//
 const searchInput = document.getElementById("searchInput");
// //const suggestionsElement = document.getElementById("suggestions");

// searchInput.addEventListener("input", function() {
//   const input = searchInput.value;
//   if (input.length >= 3) {
//     const result = recipesTab.filter(recipe =>
//       recipe.name.toLowerCase().includes(input.toLowerCase()) ||
//       recipe.description.toLowerCase().includes(input.toLowerCase()) ||
//       recipe.ingredients.some(ingredient =>
//         ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
//         )
//         );
//         console.log(result);
//         displayResultsPrincipal(result);
      
//       } else {
//         displayResultsPrincipal(recipesTab); // affiche toutes les recettes si la recherche est vide
//       }  
// });





searchInput.addEventListener("input", function() {
  const input = searchInput.value;
  //const li = document.querySelectorAll("li");
  // li.forEach(ingredient => {
  //   if (ingredient.textContent.toLowerCase().includes(input.toLowerCase())) {
  //     ingrediesnt.style.display = "block";
  //   } else {
  //     ingredient.style.display = "none";
  //   }
  // });
  if (input.length >= 3) {
    const result = recipesTab.filter(recipe =>
      recipe.name.toLowerCase().includes(input.toLowerCase()) ||
      recipe.description.toLowerCase().includes(input.toLowerCase()) ||
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
      )
    );
    displayResults(result);
  } else {
    displayResults(recipesTab);
  }
});

//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE PRINCIPALE//
//const grid = document.querySelector(".grid-container");

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
//et n'afficher que les recettes qui contiennent les ingredients recherchés
const searchInputTagIngredient = document.getElementById("searchInputTagIngredient");
const li = document.querySelectorAll("li");

searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value;
  // boucle sur ingredient ou li ?
  ingredient.forEach(ingredient => {
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
        displayResults(result); // affiche les résultats filtrés
      } else {
        displayResults(recipesTab); // affiche toutes les recettes si la recherche est vide
      }  
}); 

//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE INGREDIENTS
//const grid = document.querySelector(".grid-container");
// function displayResultsIngredients(results){
//   grid.innerHTML = "";
//   results.forEach(recipe => {
//     const recipeDetail = recipeFactory(recipe);
//     const recipeElement = recipeDetail.getRecipeDOM();
//     grid.appendChild(recipeElement);
//   }); 
// }

//recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
async function getIngredients() {
  try {
    recipesTab = await getRecipes();
    const ingredientsList = document.querySelector("#ingredients");
    const ul = document.createElement("ul");
    ingredientsList.appendChild(ul);
    let allIngredients = [];
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

const chevron = document.querySelector("#chevron");

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

const ingredientsList = document.querySelector("#ingredients");
searchInput.addEventListener("input", function() {
  const input = searchInput.value;
  const li = document.querySelectorAll("li");
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
  tags.innerHTML = ''; // Réinitialiser les tags existants
  li.forEach(ingredient => {
    const ingredientName = ingredient.textContent.trim().toLowerCase();
    if (ingredientName.includes(inputValue)) {
      const tag = document.createElement("span"); // Ajouter le tag correspondant
      tag.innerHTML = `<strong>${ingredientName}</strong>`;
      const closeBtn = document.createElement("i");
      closeBtn.innerHTML = "❌";
      tag.classList.add("selected");
      tags.appendChild(tag);
      tags.appendChild(closeBtn);
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

//supprimer le tag en cliquant sur la croix et mettre à jour l'affichage des recettes
tags.addEventListener("click", function(e) {
  if (e.target.tagName === "I") {
    e.target.previousElementSibling.remove();
    e.target.remove();
    displayResultsIngredients(recipesTab);
  }
}
);
//selectionner l'ingredient dans la liste et l'afficher dans le tag
//pourquoi cela ne fonctionfne pas ??????????
ingredientsList.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    const ingredient = e.target.textContent.trim().toLowerCase();
    createTag(ingredient);
  }
});
//au clic sur searchInputTagIngredient mettre en display block  
searchInputTagIngredient.addEventListener("click", function() {
  ingredientsList.style.display = "block";
}
);

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

//AFFICHER UNIQUEMENT LE RESULTAT DE LA RECHERCHE DANS GRID//
function displayResults(results){
  grid.innerHTML = "";
  results.forEach(recipe => {
    const recipeDetail = recipeFactory(recipe);
    const recipeElement = recipeDetail.getRecipeDOM();
    grid.appendChild(recipeElement);
  }); 
}



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
//ingredientsTab = tableau des ingredients selectionnés

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
  //afficher l'ingredient recherché dans l'input principal
  console.log(ingredientsTab);
});
/////////////////////////////////////////////////
//********BARRE DE RECHERCHE INGREDIENTS********//
//////////////////////////////////////////////////

//PROBLEME : les recettes sont filtrées. la liste des ingredients ne se met pas à jour
//afficher que les recettes qui contiennent les ingredients recherchés
searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value;
  // On filtre les recettes contenant les ingrédients correspondant
  if (input.length >= 3) {
    //recherche dans les ingredients
    const result = recipesTab.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
      ));
    console.log(result);
    console.log(ingredientsTab); 
    displayResults(result);
  } else {
    displayResults(recipesTab);
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
// searchInput.addEventListener("input", function() {
//   const input = searchInput.value;
//   li.forEach(ingredient => {
//     if (ingredient.textContent.toLowerCase().includes(input.toLowerCase())) {
//       ingredient.style.display = "block";
//     } else {
//       ingredient.style.display = "none";
//     }
//   });
// });



//***********LES TAGS ****************//
const tags = document.querySelector("#tags");
//créer un tag avec l'ingredient selectionné au clic et :

//1. afficher uniquement les recettes qui contiennent cet ingredient
//2. possibilité de choisir plusieurs ingredients en fonction des recettes restantes
//3. stocker les tags dans le tableau ingredientsTab
//4. mise à jour de la liste des ingredients au fur et à mesure des tags créés
// methode inlcudes pour filtrer les elements saisis dans l'input    
// trim pour supprimer les espaces avant et apres le texte de chaque li
// function createTag(inputValue){
//   const li = document.querySelectorAll("#ingredients li");
//   if (inputValue.trim() === '' || inputValue.length < 3) { // Vérifier si la valeur de l'input est vide ou 3 caractères
//     tags.style.display = 'none'; // Cacher les tags
//     return;
//   } else {
//     tags.style.display = 'block'; // Afficher les tags
//   }
//   tags.innerHTML = ''; // Réinitialiser les tags existants
//   li.forEach(ingredient => {
//     const ingredientName = ingredient.textContent.trim().toLowerCase();
//     if (ingredientName.includes(inputValue)) {
//       const tag = document.createElement("span"); // Ajouter le tag correspondant
//       tag.innerHTML = `<strong>${ingredientName}</strong>`;
//       const closeBtn = document.createElement("i");
//       closeBtn.innerHTML = "❌";
//       tag.classList.add("selected");
//       tags.appendChild(tag);
//       tags.appendChild(closeBtn);
//     }
//   });
// }


// //si on saisie dans l'input, on affiche les tags correspondants
// searchInputTagIngredient.addEventListener("input", function() {
//   const input = searchInputTagIngredient.value.toLowerCase();
//   createTag(input);
// });




// searchInput.addEventListener("input", function() {
//   const input = searchInput.value.toLowerCase();
//   createTag(input);
// }
// );

// //selectionner l'ingredient dans la liste et l'afficher dans le tag
// //affichage dans grid ok
// ingredientsList.addEventListener("click", function(e) {
//   if (e.target.tagName === "LI") {
//     const ingredient = e.target.textContent.trim().toLowerCase();
//     createTag(ingredient);
//     const tags = document.querySelectorAll('.selected');
//     const values = [];
//     tags.forEach(tag => {
//       values.push(tag.textContent);
//     });
//     const result = recipesTab.filter(recipe => {
//       return values.every(value => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase())));
//     });
//     if (values.length > 0) {
//       displayResults(result);
//     } else {
//       displayResults(recipesTab);
//     }
//   }
// });


// //supprimer le tag en cliquant sur la croix et mettre à jour l'affichage des recettes
// //ok
// tags.addEventListener("click", function(e) {
//   if (e.target.tagName === "I") {
//     e.target.previousElementSibling.remove();
//     e.target.remove();
//     displayResults(recipesTab);
//   }
// }
// );

//au clic sur searchInputTagIngredient mettre en display block  
// searchInputTagIngredient.addEventListener("click", function() {
//   ingredientsList.style.display = "block";
// }
// );


// //au clic sur l'ingredient : 
// //1. on créé le tag avec l'ingredient
// //2. on stock l'ingredient dans la variable ingredientsTab
// //3. on met à jour la liste des ingredients

// ingredientsList.addEventListener("click", function(e) {
//   if (e.target.tagName === "LI") {
//     const ingredient = e.target.textContent.trim().toLowerCase();
//     createTag(ingredient);
//     ingredientsTab.push(ingredient);
//     console.log(ingredientsTab);
//     const li = document.createElement("li");
//     li.innerHTML = `<strong>${ingredient}`;
//     ul.appendChild(li);
//   }
// }
// );

// // au clic sur la croix du tag :
// // 1. on supprime le tag
// // 2. on supprime l'ingredient du tableau ingredientsTab
// // 3. on met à jour la liste des ingredients

// tags.addEventListener("click", function(e) {
//   if (e.target.tagName === "I") {
//     const tag = e.target.previousElementSibling;
//     if (tag) {
//       tag.remove();
//       e.target.remove();
//       const ingredient = tag.textContent.trim().toLowerCase();
//       ingredientsTab.splice(ingredientsTab.indexOf(ingredient), 1);
//       console.log(ingredientsTab);
//       const li = document.querySelectorAll("ul li");
//       li.forEach(ingredient => {
//         if (ingredient.textContent.trim().toLowerCase() === ingredient.textContent.trim().toLowerCase()) {
//           ingredient.remove();
//         }
//       });
//     }
//   }
// });

// function createTag(inputValue){
//   const li = document.querySelectorAll("#ingredients li");
//   if (inputValue.trim() === '' || inputValue.length < 3) { // Vérifier si la valeur de l'input est vide ou 3 caractères
//     tags.style.display = 'none'; // Cacher les tags
//     return;
//   } else {
//     tags.style.display = 'block'; // Afficher les tags
//   }

//   // Réinitialiser les tags existants
//   tags.innerHTML = '';

//   // Filtrer les ingrédients qui correspondent à la valeur de l'input
//   const matchingIngredients = [];
//   li.forEach(ingredient => {
//     const ingredientName = ingredient.textContent.trim().toLowerCase();
//     if (ingredientName.includes(inputValue)) {
//       matchingIngredients.push(ingredientName);
//     }
//   });

//   // Créer un tag pour chaque ingrédient correspondant
//   matchingIngredients.forEach(ingredient => {
//     const tag = document.createElement("span");
//     tag.innerHTML = `<strong>${ingredient}</strong>`;
//     const closeBtn = document.createElement("i");
//     closeBtn.innerHTML = "❌";
//     tag.classList.add("selected");
//     tags.appendChild(tag);
//     tags.appendChild(closeBtn);

//     // Gérer la sélection du tag
//     tag.addEventListener("click", () => {
//       tag.classList.toggle("selected");
//       if (tag.classList.contains("selected")) {
//         ingredientsTab.push(ingredient);
//       } else {
//         ingredientsTab.splice(ingredientsTab.indexOf(ingredient), 1);
//       }
//       console.log(ingredientsTab);
//     });

//     // Mettre à jour la liste des ingrédients en fonction des tags sélectionnés
//     const filteredRecipes = recipes.filter(recipe => {
//       const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
//       return ingredientsTab.every(ingredient => ingredients.includes(ingredient));
//     });

//     const availableIngredients = getAvailableIngredients(filteredRecipes);
//     updateIngredientList(availableIngredients);
//   });
// }

////////////CREATION TAG////////////////

//selectedTags recupère les tags créés et supprimés
const selectedTags = [];

function createTag(inputValue) {
  if (inputValue.trim() === "" || inputValue.length < 3) {
    tags.style.display = "none";
    return;
  }
  const li = document.querySelectorAll("#ingredients li");
  li.forEach((ingredient) => {
    const ingredientName = ingredient.textContent.trim().toLowerCase();
    if (ingredientName.includes(inputValue)) {
      const tag = document.createElement("span");
      tag.innerHTML = `<strong>${ingredientName}</strong>`;
      const closeBtn = document.createElement("i");
      closeBtn.innerHTML = "❌";
      tag.classList.add("selected");
      tags.appendChild(tag);
      tags.appendChild(closeBtn);
    }
  });
  tags.style.display = "block";
}

function filterRecipes() {
  const searchText = searchInput.value.toLowerCase().trim();
  const filteredRecipes = recipesTab.filter((recipe) => {
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
    const includesSearchText = recipe.name.toLowerCase().includes(searchText) || ingredients.includes(searchText);
    const includesSelectedTags = selectedTags.every((tag) => ingredients.includes(tag));
    return includesSearchText && includesSelectedTags;
  });
  displayResults(filteredRecipes);
}


//OK ajouter l'ingrédient dans le tableau selectedTags
//KO pour le filtrage (filterRecipes ne fonctionne pas)
ingredientsList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const ingredient = e.target.textContent.trim().toLowerCase();
    createTag(ingredient);
    selectedTags.push(ingredient);
    filterRecipes();
    console.log(selectedTags);
    const li = document.createElement("li");
    li.innerHTML = `<strong>${ingredient}`;
    ul.appendChild(li);
  }
});

//OK Supprimer l'ingrédient des tags sélectionnés dans le tableau selectedTags
//KO pour le filtrage (filterRecipes ne fonctionne pas)
tags.addEventListener("click", function(e) {
  if (e.target.tagName === "I") {
    const ingredientName = e.target.previousElementSibling.textContent.trim().toLowerCase();
    e.target.previousElementSibling.remove();
    e.target.remove();
    const index = selectedTags.indexOf(ingredientName);
    if (index > -1) {
      selectedTags.splice(index, 1);
    }
    filterRecipes();
    console.log(selectedTags);
  }
});


// Mettre à jour l'affichage des recettes en fonction des tags sélectionnés
// function filterRecipesByTags() {
//   const recipes = document.querySelectorAll('.grid-container .recipe');
//   const selectedTags = document.querySelectorAll('#tags span');
//   recipes.forEach(recipe => {
//     let containsAllTags = true;
//     selectedTags.forEach(tag => {
//       if (!recipe.textContent.toLowerCase().includes(tag.textContent.toLowerCase())) {
//         containsAllTags = false;
//       }
//     });
//     if (containsAllTags) {
//       recipe.style.display = "block";
//     } else {
//       recipe.style.display = "none";
//     }
//   });
// }

// Mettre à jour la liste des ingrédients restants
// function updateRemainingIngredients() {
//   const recipes = document.querySelectorAll('.grid-container .recipe');
//   const selectedTags = document.querySelectorAll('#tags span');
//   const remainingIngredients = new Set();
//   recipes.forEach(recipe => {
//     if (recipe.style.display === "block") {
//       const ingredients = recipe.querySelector('.ingredients').textContent.trim().toLowerCase().split(', ');
//       ingredients.forEach(ingredient => {
//         if (!selectedTags || !selectedTags.length || !Array.from(selectedTags).some(tag => tag.textContent.toLowerCase() === ingredient)) {
//           remainingIngredients.add(ingredient);
//         }
//       });
//     }
//   });
//   const remainingIngredientsList = document.querySelector('#remaining-ingredients ul');
//   remainingIngredientsList.innerHTML = '';
//   remainingIngredients.forEach(ingredient => {
//     const li = document.createElement('li');
//     li.textContent = ingredient;
//     remainingIngredientsList.appendChild(li);
//   });
// }


// function createTag(inputValue) {
//   const li = document.querySelectorAll("#ingredients li");
//   const selectedIngredients = document.querySelectorAll(".selected");
//   const selectedIngredientsNames = Array.from(selectedIngredients).map(tag => tag.textContent.trim().toLowerCase());

//   if (inputValue.trim() === '' || inputValue.length < 3) { // Vérifier si la valeur de l'input est vide ou 3 caractères
//     tags.style.display = 'none'; // Cacher les tags
//     return;
//   } else {
//     tags.style.display = 'block'; // Afficher les tags
//   }
  
//   tags.innerHTML = ''; // Réinitialiser les tags existants
  
//   li.forEach(ingredient => {
//     const ingredientName = ingredient.textContent.trim().toLowerCase();
//     if (ingredientName.includes(inputValue) && !selectedIngredientsNames.includes(ingredientName)) {
//       const tag = document.createElement("span"); // Ajouter le tag correspondant
//       tag.innerHTML = `<strong>${ingredientName}</strong>`;
//       const closeBtn = document.createElement("i");
//       closeBtn.innerHTML = "❌";
//       tag.classList.add("selected");
//       tags.appendChild(tag);
//       tags.appendChild(closeBtn);
//       tag.addEventListener("click", function(e) {
//         e.target.classList.remove("selected");
//         e.target.nextElementSibling.remove();
//         const ingredient = e.target.textContent.trim().toLowerCase();
//         const index = ingredientsTab.indexOf(ingredient);
//         if (index !== -1) {
//           ingredientsTab.splice(index, 1);
//           console.log(ingredientsTab);
//         }
//         updateRemainingIngredients();
//       });
//       ingredientsTab.push(ingredientName);
//       console.log(ingredientsTab);
//     }
//   });
  
//   updateRemainingIngredients();
// }



