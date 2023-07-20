// Elements on the main page
const pairingButton = document.getElementById('pairingButton');
const foodRecipeTextBox = document.getElementById('foodRecipeTextBox');
const cocktailRecipeTextBox = document.getElementById('cocktailRecipeTextBox');
const saveFavoriteButton = document.getElementById('saveFavoriteButton');
const mealImageEl = document.getElementById('mealImageEl');
const drinkImageEl = document.getElementById('drinkImageEl');
const mealNameEl = document.getElementById('mealNameEl');
const drinkNameEl = document.getElementById('drinkNameEl');
const mealIngredientEl = document.getElementById('mealIngredientEl');
const drinkIngredientEl = document.getElementById('drinkIngredientEl');
const favoritesEl = document.getElementById('favoritesEl');
const clearBtn = document.getElementById('clear');

// Event listener for the "Generate Pairing" button.
// Fetches data from the Cocktail API and Meal API to display a random food and drink pairing.
pairingButton.addEventListener('click', () => {
    // Fetch data from the Cocktail API
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(cocktailData => {
            // Process the cocktail data and display it
            const cocktailName = cocktailData.drinks[0].strDrink;
            const cocktailInstructions = cocktailData.drinks[0].strInstructions;
            const cocktailPicture = cocktailData.drinks[0].strDrinkThumb;

            drinkNameEl.innerHTML = cocktailName;
            cocktailRecipeTextBox.innerHTML = cocktailInstructions;
            drinkImageEl.src = cocktailPicture;

            // Collect cocktail ingredients and display them
            const cocktailIngredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredientCocktail = cocktailData.drinks[0][`strIngredient${i}`];
                const measureCocktail = cocktailData.drinks[0][`strMeasure${i}`];

                if (ingredientCocktail || measureCocktail) {
                    cocktailIngredients.push(`${measureCocktail} ${ingredientCocktail}`);
                } else {
                    break;
                }
            }

            drinkIngredientEl.innerHTML = cocktailIngredients;

            // Fetch data from the Meal API
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(mealData => {
                    // Process the meal data and display it
                    const mealName = mealData.meals[0].strMeal;
                    const mealInstructions = mealData.meals[0].strInstructions;
                    const mealPicture = mealData.meals[0].strMealThumb;

                    mealNameEl.innerHTML = mealName;
                    foodRecipeTextBox.innerHTML = mealInstructions;
                    mealImageEl.src = mealPicture;

                    // Collect food ingredients and display them
                    const foodIngredients = [];
                    for (let i = 1; i <= 20; i++) {
                        const ingredientFood = mealData.meals[0][`strIngredient${i}`];
                        const measureFood = mealData.meals[0][`strMeasure${i}`];

                        if (ingredientFood || measureFood) {
                            foodIngredients.push(`${measureFood} ${ingredientFood}`);
                        } else {
                            break;
                        }
                    }

                    mealIngredientEl.innerHTML = foodIngredients;
                })
                .catch(error => {
                    console.error('Error fetching Meal API:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching Cocktail API:', error);
        });
});

// Function to check if the pairing data already exists in the favorites array
function isPairingDataExists(pairingData, favoritesArray) {
    return favoritesArray.some((item) => {
        return (
            item.foodName === pairingData.foodName &&
            item.drinkName === pairingData.drinkName &&
            item.foodInstructions === pairingData.foodInstructions &&
            item.drinkInstructions === pairingData.drinkInstructions &&
            item.foodIngredients === pairingData.foodIngredients &&
            item.drinkIngredients === pairingData.drinkIngredients &&
            item.foodImage === pairingData.foodImage &&
            item.drinkImage === pairingData.drinkImage
        );
    });
}

// Function to save the current pairing to local storage and create the "Show Favorite Recipe" button.
/**
 * Saves the current food and drink pairing to local storage for later retrieval.
 */
function saveToLocalStorage(pairingData) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!isPairingDataExists(pairingData, favorites)) {
        favorites.push(pairingData);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        addBtn(); // Add the new button immediately after saving to local storage
    }
}

// Event listener for the "Create a random food pairing" button.
// Fetches APIs, generates a random pairing, and saves it to local storage.
saveFavoriteButton.addEventListener('click', () => {
    // Generate pairing object
    const pairingData = {
        foodName: mealNameEl.innerHTML,
        foodInstructions: foodRecipeTextBox.innerHTML,
        foodIngredients: mealIngredientEl.innerHTML,
        foodImage: mealImageEl.src,
        drinkName: drinkNameEl.innerHTML,
        drinkInstructions: cocktailRecipeTextBox.innerHTML,
        drinkIngredients: drinkIngredientEl.innerHTML,
        drinkImage: drinkImageEl.src,
    };

    // Save the pairing to local storage
    saveToLocalStorage(pairingData);
});

function addBtn() {
    const localStrg = JSON.parse(localStorage.getItem('favorites'));

    if (localStrg.length !== 0) {
        // Clear existing buttons before adding new ones to prevent duplicates
        favoritesEl.innerHTML = '';

        for (var i = 0; i < localStrg.length; i++) {
            const pairingData = localStrg[i];

            // Create a button element for each saved pairing
            const button = document.createElement('button');
            button.textContent = localStrg[i].drinkName + ' & ' + localStrg[i].foodName;
            button.classList.add('favorite-btn');
            // Append the button to the document body or any other desired location
            favoritesEl.appendChild(button);
        }
    }
}

// Call the addBtn function on page load to generate buttons from local storage, if any.
addBtn();

clearBtn.addEventListener('click', () => {
    // Clear local storage
    localStorage.removeItem('favorites');

    // Remove all programatically added buttons
    favoritesEl.innerHTML = '';
});

// Event listener for the "Show Favorite Recipe" buttons inside the favoritesEl element.
favoritesEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('favorite-btn')) {
        const button = event.target;
        const buttonText = button.textContent; // Get the text content of the clicked button (e.g., "Drink Name & Food Name")
        const drinkName = buttonText.split(' & ')[0]; // Extract the drink name from the button text
        const foodName = buttonText.split(' & ')[1]; // Extract the food name from the button text

        // Retrieve the favorite pairings from local storage
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        // Find the corresponding pairing in the favorites array based on drinkName and foodName
        const selectedPairing = favorites.find(pairing => pairing.drinkName === drinkName && pairing.foodName === foodName);

        // Apply the selected pairing to the page
        if (selectedPairing) {
            drinkNameEl.innerHTML = selectedPairing.drinkName;
            cocktailRecipeTextBox.innerHTML = selectedPairing.drinkInstructions;
            drinkImageEl.src = selectedPairing.drinkImage;
            drinkIngredientEl.innerHTML = selectedPairing.drinkIngredients;

            mealNameEl.innerHTML = selectedPairing.foodName;
            foodRecipeTextBox.innerHTML = selectedPairing.foodInstructions;
            mealImageEl.src = selectedPairing.foodImage;
            mealIngredientEl.innerHTML = selectedPairing.foodIngredients;
        }
    }
});