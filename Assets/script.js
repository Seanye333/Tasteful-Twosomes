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

// Get the button element - note change startbutton to HTML element name 
const startButton = document.getElementById('startButton');
// Add click event listener to the button
startButton.addEventListener('click', () => {
  // Navigate to the next page - change 'next-page.html' to second page HTML name 
  window.location.href = 'generator.html';
   
});

// second page - in HTML - add <button id="pairingButton">Generate Pairing</button><textarea id="pairingTextBox" rows="5"></textarea>
const pairingButton = document.getElementById('pairingButton');
const foodRecipeTextBox = document.getElementById('');
const cocktailRecipeTextBox = document.getElementById('');
const pairingTextBox = document.getElementById('pairingTextBox');
const saveFavoriteButton = document.getElementById('saveFavoriteButton');

pairingButton.addEventListener('click', () => {
    // Fetch data from the Cocktail API
    fetch('https://www.thecocktaildb.com/api.php')
      .then(response => response.json())
      .then(cocktailData => {
        // Process the cocktail data
        const cocktailName = cocktailData.name; // Replace 'name' with the actual property in your API response
        const cocktailInstructions = cocktailData.instructions; // Replace 'instructions' with the actual property in your API response

        // Fetch data from the Meal API
    fetch('https://www.themealdb.com/api.php')
          .then(response => response.json())
          .then(mealData => {
            // Process the meal data
            const mealName = mealData.name; // Replace 'name' with the actual property in your API response
            const mealInstructions = mealData.instructions; // Replace 'instructions' with the actual property in your API response
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
