// Elements on the main page
const pairingButton = document.getElementById('pairingButton');
const foodRecipeTextBox = document.getElementById('foodRecipeTextBox');
const cocktailRecipeTextBox = document.getElementById('cocktailRecipeTextBox');
const pairingTextBox = document.getElementById('pairingTextBox');
const saveFavoriteButton = document.getElementById('saveFavoriteButton');
const mealImageEl = document.getElementById('mealImageEl');
const drinkImageEl = document.getElementById('drinkImageEl');
const mealNameEl = document.getElementById('mealNameEl');
const drinkNameEl = document.getElementById('drinkNameEl');
const mealIngredientEl = document.getElementById('mealIngredientEl');
const drinkIngredientEl = document.getElementById('drinkIngredientEl');

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

// Function to save the current pairing to local storage and create the "Show Favorite Recipe" button.
/**
 * Saves the current food and drink pairing to local storage for later retrieval.*/

function saveToLocalStorage(pairingData) {
	const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
	favorites.push(pairingData);
	localStorage.setItem('favorites', JSON.stringify(favorites));
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
  
    // Clear the searchHistory element
    searchHistory.innerHTML = '';
  
    // Retrieve saved pairings from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // Loop through the saved pairings and display their names in the searchHistory element
    favorites.forEach(pairing => {
      const pairingRecipeHistory = document.createElement('div');
      pairingRecipeHistory.classList.add('saved-pairing');
      pairingRecipeHistory.textContent = `${pairing.foodName} & ${pairing.drinkName}`;
      pairingRecipeHistory.setAttribute('data-food-name', pairing.foodName);
      pairingRecipeHistory.setAttribute('data-food-instructions', pairing.foodInstructions);
      pairingRecipeHistory.setAttribute('data-food-ingredients', pairing.foodIngredients);
      pairingRecipeHistory.setAttribute('data-drink-name', pairing.drinkName);
      pairingRecipeHistory.setAttribute('data-drink-instructions', pairing.drinkInstructions);
      pairingRecipeHistory.setAttribute('data-drink-ingredients', pairing.drinkIngredients);
  
      // Append the pairing container to the searchHistory element
      searchHistory.appendChild(pairingRecipeHistory);
  
      // Add click event listener to the saved pairing container
      pairingRecipeHistory.addEventListener('click', () => {
        // Retrieve the pairing details from the data attributes
        const foodName = pairingRecipeHistory.getAttribute('data-food-name');
        const foodInstructions = pairingRecipeHistory.getAttribute('data-food-instructions');
        const foodIngredients = pairingRecipeHistory.getAttribute('data-food-ingredients');
        const drinkName = pairingRecipeHistory.getAttribute('data-drink-name');
        const drinkInstructions = pairingRecipeHistory.getAttribute('data-drink-instructions');
        const drinkIngredients = pairingRecipeHistory.getAttribute('data-drink-ingredients');
  
        // Update recipe boxes with the details of the selected pairing
        mealNameEl.innerHTML = foodName;
        foodRecipeTextBox.innerHTML = foodInstructions;
        mealIngredientEl.innerHTML = foodIngredients;
        
        drinkNameEl.innerHTML = drinkName;
        cocktailRecipeTextBox.innerHTML = drinkInstructions;
        drinkIngredientEl.innerHTML = drinkIngredients;
      });
    });
  });
  
  