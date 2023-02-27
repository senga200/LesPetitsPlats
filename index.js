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
    //stockage des recettes dans une variable recipesTab
    const recipesTab = await response.json();
    console.table(recipesTab);
    // retourne les recipes dans le tableau recipesTab
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
let inputResult = "";
//container de toutes les recettes
const grid = document.querySelector(".grid-container");

//Barrre de recherche secondaire ingrédients 
const searchInputTagIngredient = document.getElementById("searchInputTagIngredient");
let allIngredients = [];//liste des ingrédients
let ingredientsTab = [];//tableau des ingredients selectionnés
const ingredientsList = document.querySelector("#ingredients");
const ulIngredients = document.createElement("ul");

//Barrre de recherche secondaire appareils
const searchInputTagAppliances = document.getElementById("searchInputTagAppareil");
let allAppliances= [];//liste des appareils
let appliancesTab = [];//
const appliancesList = document.querySelector("#appareils");

//barre de recherche secondaire ustensiles
const searchInputTagUstensils = document.getElementById("searchInputTagUstensile");
let allUstensils = [];//liste des ustensiles
let ustensilsTab = [];
const ustensilsList = document.querySelector("#ustensiles");

//liste des tags

//const li = document.querySelectorAll("li");
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
//recuperer la liste de tous ingredients et les afficher dans la div ingredients et supprimer les doublons
async function getIngredients() {
  try {
    recipesTab = await getRecipes();
    ingredientsList.appendChild(ulIngredients); //creer la liste des ingredients
    recipesTab.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        //console.log(ingredient.ingredient);
        if (!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
          allIngredients.push(ingredient.ingredient.toLowerCase());
          const li = document.createElement("li");
          li.innerHTML = `<strong>${ingredient.ingredient}`;
          ulIngredients.appendChild(li);
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
// const ul = document.querySelector("ul");
// chevron.addEventListener("click", function() {
//   if (chevron.classList.contains("rotated")) {
//     chevron.classList.remove("rotated");
//     searchInputTagIngredient.style.display = "none";
//     ulIngredients.style.display = "none";
//   } else {
//     chevron.classList.add("rotated");
//     ingredientsList.classList.toggle('expanded');
//     searchInputTagIngredient.style.display = "block";
//     ulIngredients.style.display = "block";
//   }
// });





//afficher que les recettes qui contiennent les ingredients recherchés
searchInputTagIngredient.addEventListener("input", function() {
  const input = searchInputTagIngredient.value;
  // On filtre les recettes contenant les ingrédients correspondants
  if (input.length >= 3) {
    //recherche dans les ingredients
    const result = recipesTab.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
      ));
    console.log(result);
    console.log(ingredientsTab); 
    if (result.length > 0) {
      displayResults(result);
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
    }
  } else {
    displayResults(recipesTab);
  }  
});
////////////////////////////////////////
//***********LES TAGS ****************//
////////////////////////////////////////
const tags = document.querySelector("#tags");
////////////CREATION TAG////////////////
//selectedTags recupère les tags créés et supprimés
const selectedTags = [];

function createTag(inputValue) {
  const tag = document.createElement("span");
  if (inputValue.trim() === "" || inputValue.length < 3) {
    tags.style.display = "none";
    return;
  }
  const liTag = document.querySelectorAll("#ingredients li");
  liTag.forEach((ingredient) => {
    const ingredientName = ingredient.textContent.trim().toLowerCase();
    if (ingredientName.includes(inputValue)) {
      tag.innerHTML = `<strong>${ingredientName}</strong>`;
      const closeBtn = document.createElement("i");
      closeBtn.classList.add("fa-regular", "fa-times-circle");
      tag.classList.add("selected");
      tags.appendChild(tag);
      tag.appendChild(closeBtn);
      closeBtn.addEventListener("click", function() {
        tag.style.display = "none";
      });
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
  if (filteredRecipes.length > 0) {
    displayResults(filteredRecipes);
  } else {
    grid.innerHTML = "<p>Aucune recette ne correspond à votre recherche.</p>";
  }
}



//OK ajouter l'ingrédient dans le tableau selectedTags
//OK pour le filtrage 
//OK Supprimer l'ingrédient devenu tag de la liste des ingredients
ingredientsList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const ingredient = e.target.textContent.trim().toLowerCase();
    createTag(ingredient);
    selectedTags.push(ingredient);
    filterRecipes();
    console.log(selectedTags);
    const liTag = document.querySelectorAll("#ingredients li");
    liTag.forEach((li) => {
      if (li.textContent.trim().toLowerCase() === ingredient) {
        li.remove();
      }
    });
  }
});


//OK Supprimer l'ingrédient des tags sélectionnés dans le tableau selectedTags
//OK pour le filtrage 
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


/////////////////////////////////////////////////
//********BARRE DE RECHERCHE APPAREILS********//
//////////////////////////////////////////////////
//recuperer la liste de tous appareils et les afficher dans la div appareils et supprimer les doublons
// récupérer la liste de tous les appareils et les afficher dans la div appareils en supprimant les doublons


async function getAppliances() {
  const ulAppliances = document.createElement("ul");
  try {
    recipesTab = await getRecipes();
    appliancesList.appendChild(ulAppliances); //creer la liste des appareils
    recipesTab.forEach(recipe => {
      if (!allAppliances.includes(recipe.appliance.toLowerCase())) {
        allAppliances.push(recipe.appliance.toLowerCase());
        const li = document.createElement("li");
        li.innerHTML = `<strong>${recipe.appliance}`;
        ulAppliances.appendChild(li);
      }
    });
    console.log("total appareils : ", allAppliances.length);
  } catch (error) {
    console.error(error);
  }
}
//charger la liste des appareils
getAppliances();

//afficher la liste des appareils au click sur le chevron
//PROBLEME d'affichage à resoudre
 //const ul = document.querySelector("ul");
// chevron.addEventListener("click", function() {
//   if (chevron.classList.contains("rotated")) {
//     chevron.classList.remove("rotated");
//     searchInputTagIngredient.style.display = "none";
//     ulAppliances.style.display = "none";
//   } else {
//     chevron.classList.add("rotated");
//     appliancesList.classList.toggle('expanded');
//     searchInputTagIngredient.style.display = "block";
//     ulAppliances.style.display = "block";
//   }
// });

//afficher que les recettes qui contiennent les appareils recherchés
searchInputTagAppliances.addEventListener("input", function() {
  const input = searchInputTagAppliances.value;
  // On filtre les recettes contenant les appareils correspondants
  if (input.length >= 3) {
    //recherche dans les appareils
    const result = recipesTab.filter(recipe =>
      recipe.appliance.toLowerCase().includes(input.toLowerCase())
    );
    console.log(result);
    if (result.length > 0) {
      displayResults(result);
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
    }
  } else {
    displayResults(recipesTab);
  }  
});

////////////////////////////////////////////
//*********MENU DEROULANT APPAREILS*********** */
//const appareils = document.querySelector("#appareils");
const blocSearchAppareils = document.querySelector(".blocSearchAppareils");
blocSearchAppareils.style.border = "2px solid green";


let toggleIndexAppareils = 0;

blocSearchAppareils.addEventListener('click', () => {

    // console.log(dropdown.scrollHeight);

    if(toggleIndexAppareils === 0){
        appliancesList.style.height = `${appliancesList.scrollHeight}px`;
        toggleIndexAppareils++;
    } else {
        appliancesList.style.height = `${blocSearchAppareils.scrollHeight}px`;
        toggleIndexAppareils--;
    }

});
//////////////////////////////////////////////
//*********MENU DEROULANT INGREDIENTS*********** */
const blocSearchIngredients = document.querySelector(".blocSearchIngredients");

let toggleIndexIngredients = 0;

blocSearchIngredients.addEventListener('click', () => {

    // console.log(dropdown.scrollHeight);

    if(toggleIndexIngredients === 0){
        ingredientsList.style.height = `${ingredientsList.scrollHeight}px`;
        toggleIndexIngredients++;
    } else {
        ingredientsList.style.height = `${blocSearchIngredients.scrollHeight}px`;
        toggleIndexIngredients--;
    }

});

//////////////////////////////////////////////
//*********MENU DEROULANT USTENSILES*********** */
const blocSearchUstensiles = document.querySelector(".blocSearchUstensiles");

let toggleIndexUstensiles = 0;

blocSearchUstensiles.addEventListener('click', () => {


    if(toggleIndexUstensiles === 0){
        ustensilsList.style.height = `${ustensilsList.scrollHeight}px`;
        toggleIndexUstensiles++;
    } else {
        ustensilsList.style.height = `${blocSearchUstensiles.scrollHeight}px`;
        toggleIndexUstensiles--;
    }

});




//addeventlistener + queryselectorall = foreach
// const appareils = document.querySelector("#appareils");
// const blocSearch = document.querySelectorAll(".blocSearch");
// //blocSearch.style.border = "2px solid green";
// console.log(blocSearch);

// let toggleIndex = 0;

// blocSearch.forEach(searchItem => {
//   searchItem.addEventListener('click', () => {
//     if (toggleIndex === 0) {
//       appareils.style.height = `${appareils.scrollHeight}px`;
//       toggleIndex++;
//     } else {
//       appareils.style.height = `${searchItem.scrollHeight}px`;
//       toggleIndex--;
//     }
//   });
// });



/////////////////////////////////////////////////
//********BARRE DE RECHERCHE USTENSILES********//
//////////////////////////////////////////////////
//recuperer la liste de tous les ustensiles et les afficher dans la div ustensiles et supprimer les doublons


async function getUstensils() {
  const ulUstensils = document.createElement("ul");
  try {
    recipesTab = await getRecipes();
    ustensilsList.appendChild(ulUstensils); //creer la liste des appareils
    recipesTab.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        if (!allUstensils.includes(ustensil.toLowerCase())) {
          allUstensils.push(ustensil.toLowerCase());
          const li = document.createElement("li");
          li.innerHTML = `<strong>${ustensil}`;
          ulUstensils.appendChild(li);
        }
      });
    });
    console.log("total ustensiles : ", allUstensils.length);
  } catch (error) {
    console.error(error);
  }
}
//charger la liste des ustensiles
getUstensils();

// //afficher la liste des ustensiles au click sur le chevron
// //PROBLEME d'affichage à resoudre

// chevronUstensils.addEventListener("click", function() {
//   if (chevronUstensils.classList.contains("rotated")) {
//     chevronUstensils.classList.remove("rotated");
//     searchInputTagIngredient.style.display = "none";
//     ulUstensils.style.display = "none";
//   } else {
//     chevronUstensils.classList.add("rotated");
//     ustensilsList.classList.toggle('expanded');
//     searchInputTagIngredient.style.display = "block";
//     ulUstensils.style.display = "block";
//   }
// });

// //afficher que les recettes qui contiennent les ustensiles recherchés
searchInputTagUstensils.addEventListener("input", function() {
  const input = searchInputTagUstensils.value;
  // On filtre les recettes contenant les appareils correspondants
  if (input.length >= 3) {
    //recherche dans les appareils
    const result = recipesTab.filter(recipe =>
      recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(input.toLowerCase()))
    );
    console.log(result);
    if (result.length > 0) {
      displayResults(result);
    } else {
      grid.innerHTML = "Aucune recette ne correspond à votre critère de recherche";
    }
  } else {
    displayResults(recipesTab);
  }
});





// ////////////////////////////////////////
// //***********LES TAGS ****************//
// ////////////////////////////////////////







// ////////////////////////////////////////  
