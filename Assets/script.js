// Sudo Code of Tasteful Twosomes!!
// 	1. Create Hyperlinks for the footer section including the GitHub pages of group members 
// 	2. Link START Push button in the middle of the home page with HTML, and once the PB is clicked, pull the APIs  
// 	3. Once START PB is pressed, the navigation bar appears (additional feature- not part of MVP)  
// 	4. Provide two navigation push buttons for users to select: Pairing Generator and Store Recipes 
// 	5. If the user clicks on the Pairing Generator, the webpage navigates to page two to allow the user to create a random food and drink pairing. 
// 	6. Click the Create another food pairing push button to randomly generate food and drink recipes. 
// 	7. Display the food and drink recipe description in the detail section below. 
// 	8. Click on the Create another food pairing PB to reset the other random recipes if the user would like to randomly generate a different receipt. 
// 	9. Click on Add to Favorites to store the current receipt in the local storage for page three to search 
// 	10. Click on the store recipes navigation button to move to page three 
// 	11. Display the last recipe on page 3 with detail that was generated on page 2 
// 	12. Display a list of favorite recipe pairings on the Favorite Recipe Pairings window. Users will be able to use the scroll bar to scroll up and down from the last 20 favorite pairings 
// 	13. User can also use the search tool right below the recipe pairings to display favorite recipes
//  14. Select and click on pairing on the scroll window to display different recipes on the recipe display windows 

//});

// second page - in HTML - add <button id="pairingButton">Generate Pairing</button><textarea id="pairingTextBox" rows="5"></textarea>
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

pairingButton.addEventListener('click', () => {
    // Fetch data from the Cocktail API
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(cocktailData => {
        console.log(cocktailData)
        // Process the cocktail data
        const cocktailName = cocktailData.drinks[0].strDrink; // Replace 'name' with the actual property in your API response
        console.log(cocktailName)
        const cocktailInstructions = cocktailData.drinks[0].strInstructions; // Replace 'instructions' with the actual property in your API response
        console.log(cocktailInstructions)
        const cocktailPicture = cocktailData.drinks[0].strDrinkThumb
        console.log(cocktailPicture)

        drinkNameEl.innerHTML = cocktailName;
        cocktailRecipeTextBox.innerHTML = cocktailInstructions;
        drinkImageEl.src = cocktailPicture;

        // Collect cocktail ingredients
        const cocktailIngredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientCocktail = cocktailData.drinks[0][`strIngredient${i}`];
          const measureCocktail = cocktailData.drinks[0][`strMeasure${i}`];
          
          if (ingredientCocktail && measureCocktail) {
            cocktailIngredients.push(`${measureCocktail} ${ingredientCocktail}`);
          } else {
            break;
          }
        }
            const cocktailRecipeText = `Drink: ${cocktailName}\n\n${cocktailInstructions}`;
            cocktailRecipeTextBox.value = cocktailRecipeText;
            console.log(cocktailIngredients)
        // Fetch data from the Meal API
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
          .then(response => response.json())
          .then(mealData => {
            console.log(mealData)
            // Process the meal data
            const mealName = mealData.meals[0].strMeal; // Replace 'name' with the actual property in your API response
            console.log(mealName)
            const mealInstructions = mealData.meals[0].strInstructions; // Replace 'instructions' with the actual property in your API response
            console.log(mealInstructions)
            const mealPicture = mealData.meals[0].strMealThumb
            console.log(mealPicture)

            mealNameEl.innerHTML = mealName;
            foodRecipeTextBox.innerHTML = mealInstructions;
            mealImageEl.src = mealPicture;

            const foodIngredients = [];
            for (let i = 1; i <= 20; i++) {
              const ingredientFood = mealData.meals[0][`strIngredient${i}`];
              const measureFood = mealData.meals[0][`strMeasure${i}`];
              
              if (ingredientFood && measureFood) {
                foodIngredients.push(`${measureFood} ${ingredientFood}`);
                
              } else {
                break;
              }
            }
            console.log(foodIngredients)
            foodRecipeTextBox.value=foodIngredients;

            const foodRecipeText = `Food: ${ingredientFood}\n\n${measureFood}`;
            foodRecipeTextBox.value = foodRecipeText;
            console.log(foodIngredients)

            // Generate pairing text
            const pairingText = `Food: ${mealName}\n\n${mealInstructions}\n\nDrink: ${cocktailName}\n\n${cocktailInstructions}`;
            // Display pairing text in the text box
            pairingTextBox.value = pairingText;
            saveFavoriteButton.addEventListener('click', () => {
                // Save to favorites button Button to store to local storage  
                // Save pairing text to local storage
            localStorage.setItem('pairing', pairingText);
            console.log('Pairing generated and saved to local storage:', pairingText);
        });
          })
          .catch(error => {
            console.error('Error fetching Meal API:', error);   
          });
      })
      .catch(error => {
        console.error('Error fetching Cocktail API:', error);
      });
  });
