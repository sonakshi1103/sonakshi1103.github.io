
 // ============================================
 // TUTORIAL 6: LOAD REAL DATA
 // From static data to async data loading
 // ============================================

 // Global variable to store loaded restaurant data
 let restaurants = [];

 // Wait for the page to load
 document.addEventListener('DOMContentLoaded', function() {
     console.log('Tutorial 6: Async data loading ready!');

     // Get UI elements
     const loadButton = document.querySelector('#load-data-button');
     const statusDisplay = document.querySelector('#loading-status');
     const statusMessage = statusDisplay.querySelector('.status-message');

     // Get the method buttons (start disabled)
     const displayButton = document.querySelector('#display-button');
     const filterButton = document.querySelector('#filter-button');
     const mapButton = document.querySelector('#map-button');
     const errorButton = document.querySelector('#error-button');

     // ============================================
     // MAIN DATA LOADING FUNCTION
     // ============================================

     // This is the key new skill - loading data asynchronously
     loadButton.addEventListener('click', async function() {

         // Step 1: Show loading state
         updateStatus('loading', 'Loading restaurant data...');
         loadButton.disabled = true;
         toggleMethodButtons(false);

         // Clear old data and results
         restaurants = [];

         document.querySelector('#restaurant-list').innerHTML =
             '<p class="placeholder">Loading restaurant data...</p>';

         document.querySelector('#filtered-list').innerHTML =
             '<p class="placeholder">Loading restaurant data...</p>';

         document.querySelector('#mapped-list').innerHTML =
             '<p class="placeholder">Loading restaurant data...</p>';

         try {
             // Step 2: Use fetch() to load data
             const response = await fetch('restaurants.json');

             // Check if the request was successful
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }

             // Step 3: Convert response to JSON
             const data = await response.json();

             // Check that the data is an array
             if (!Array.isArray(data)) {
                 throw new Error('Invalid restaurant data');
             }

             // Step 4: Store data in global variable
             restaurants = data;

             // Step 5: Show success state and enable buttons
             updateStatus(
                 'success',
                 `Successfully loaded ${restaurants.length} restaurants!`
             );

             toggleMethodButtons(true);

             document.querySelector('#restaurant-list').innerHTML =
                 '<p class="placeholder">Click Display All Restaurants to see the results</p>';

             document.querySelector('#filtered-list').innerHTML =
                 '<p class="placeholder">Click Show Cheap Restaurants to filter the results</p>';

             document.querySelector('#mapped-list').innerHTML =
                 '<p class="placeholder">Click Show Restaurant Names to see the results</p>';

         } catch (error) {
             // Step 6: Handle errors gracefully
             console.error('Error loading restaurants:', error);

             restaurants = [];
             toggleMethodButtons(false);

             updateStatus(
                 'error',
                 'Failed to load restaurants. Please try again.'
             );

             document.querySelector('#restaurant-list').innerHTML =
                 '<p class="placeholder">Restaurant data is unavailable</p>';

             document.querySelector('#filtered-list').innerHTML =
                 '<p class="placeholder">Restaurant data is unavailable</p>';

             document.querySelector('#mapped-list').innerHTML =
                 '<p class="placeholder">Restaurant data is unavailable</p>';

         } finally {
             // Re-enable the load button so users can retry
             loadButton.disabled = false;
             loadButton.textContent = 'Reload Restaurant Data';
         }
     });

     // ============================================
     // ARRAY METHOD FUNCTIONS - Same as Tutorial 5
     // ============================================

     // Display all restaurants using forEach()
     displayButton.addEventListener('click', function() {
         const restaurantList = document.querySelector('#restaurant-list');

         // Check if we have data first
         if (restaurants.length === 0) {
             restaurantList.innerHTML =
                 '<p class="placeholder">No data loaded yet</p>';
             return;
         }

         // Step 7: Use forEach to display all restaurants
         restaurantList.innerHTML = '';

         restaurants.forEach(function(restaurant) {
             const item = document.createElement('div');
             item.className = 'restaurant-item';

             const name = document.createElement('div');
             name.className = 'restaurant-name';
             name.textContent = restaurant.name;

             const details = document.createElement('div');
             details.className = 'restaurant-cuisine';
             details.textContent =
                 `${restaurant.cuisine} | ${restaurant.neighborhood}`;

             const rating = document.createElement('div');
             rating.className = 'restaurant-rating';
             rating.textContent = `Rating: ${restaurant.rating}/5`;

             const price = document.createElement('span');
             price.className = 'restaurant-price';
             price.textContent = restaurant.priceRange;

             item.append(name, details, rating, price);
             restaurantList.appendChild(item);
         });
     });

     // Filter cheap restaurants using filter()
     filterButton.addEventListener('click', function() {
         const filteredList = document.querySelector('#filtered-list');

         if (restaurants.length === 0) {
             filteredList.innerHTML =
                 '<p class="placeholder">No data loaded yet</p>';
             return;
         }

         // Step 8: Filter restaurants with the $ price range
         const cheapRestaurants = restaurants.filter(function(restaurant) {
             return restaurant.priceRange === '$';
         });

         filteredList.innerHTML = '';

         cheapRestaurants.forEach(function(restaurant) {
             const item = document.createElement('div');
             item.className = 'restaurant-item';

             const name = document.createElement('div');
             name.className = 'restaurant-name';
             name.textContent = restaurant.name;

             const details = document.createElement('div');
             details.className = 'restaurant-cuisine';
             details.textContent = restaurant.cuisine;

             const price = document.createElement('span');
             price.className = 'restaurant-price';
             price.textContent = restaurant.priceRange;

             item.append(name, details, price);
             filteredList.appendChild(item);
         });

         if (cheapRestaurants.length === 0) {
             filteredList.innerHTML =
                 '<p class="placeholder">No cheap restaurants found</p>';
         }
     });

     // Show restaurant names using map()
     mapButton.addEventListener('click', function() {
         const mappedList = document.querySelector('#mapped-list');

         if (restaurants.length === 0) {
             mappedList.innerHTML =
                 '<p class="placeholder">No data loaded yet</p>';
             return;
         }

         // Step 9: Extract restaurant names using map
         const names = restaurants.map(function(restaurant) {
             return restaurant.name;
         });

         mappedList.innerHTML = '';

         const list = document.createElement('ul');
         list.className = 'name-list';

         names.forEach(function(name) {
             const item = document.createElement('li');
             item.textContent = name;
             list.appendChild(item);
         });

         mappedList.appendChild(list);
     });

     // ============================================
     // ERROR HANDLING DEMO
     // ============================================

     // This demonstrates what happens when fetch() fails
     errorButton.addEventListener('click', async function() {
         const errorDisplay = document.querySelector('#error-display');

         errorButton.disabled = true;

         errorDisplay.innerHTML =
             '<div class="status-display loading"><p class="status-message">Trying to load from bad URL...</p></div>';

         try {
             // This will fail because the URL doesn't exist
             const response = await fetch('nonexistent-file.json');

             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }

             const data = await response.json();

             errorDisplay.innerHTML =
                 '<p class="placeholder">This should not appear</p>';

         } catch (error) {
             // Step 10: Show user-friendly error message
             errorDisplay.innerHTML = '';

             const errorMessage = document.createElement('div');
             errorMessage.className = 'error-message';
             errorMessage.textContent =
                 'Unable to load data. Please try again.';

             const retryButton = document.createElement('button');
             retryButton.className = 'load-button';
             retryButton.textContent = 'Retry';

             retryButton.addEventListener('click', function() {
                 errorButton.click();
             });

             errorDisplay.append(errorMessage, retryButton);

             console.error('Demonstrated error:', error);

         } finally {
             errorButton.disabled = false;
         }
     });
 });

 // ============================================
 // UTILITY FUNCTIONS
 // ============================================

 // Helper function to enable/disable method buttons
 function toggleMethodButtons(enabled) {
     const buttons = [
         document.querySelector('#display-button'),
         document.querySelector('#filter-button'),
         document.querySelector('#map-button')
     ];

     buttons.forEach(button => {
         button.disabled = !enabled;
     });
 }

 // Helper function to update status display
 function updateStatus(state, message) {
     const statusDisplay = document.querySelector('#loading-status');
     const statusMessage = statusDisplay.querySelector('.status-message');

     // Remove all state classes
     statusDisplay.classList.remove('loading', 'success', 'error');

     // Add new state class
     if (state !== 'ready') {
         statusDisplay.classList.add(state);
     }

     statusMessage.textContent = message;
 }

 // ============================================
 // DEBUGGING FUNCTIONS
 // ============================================

 // Check if data is loaded
 function checkDataStatus() {
     console.log('=== Data Status ===');
     console.log('Restaurants loaded:', restaurants.length);

     if (restaurants.length > 0) {
         console.log('First restaurant:', restaurants[0].name);
         console.log(
             'All restaurant names:',
             restaurants.map(r => r.name)
         );
     }

     console.log('==================');
 }

 // Manually load data (for testing)
 async function manualLoadData() {
     try {
         const response = await fetch('restaurants.json');

         if (!response.ok) {
             throw new Error('Load failed');
         }

         const data = await response.json();

         if (!Array.isArray(data)) {
             throw new Error('Invalid restaurant data');
         }

         restaurants = data;

         console.log(
             `Manually loaded ${restaurants.length} restaurants`
         );

         toggleMethodButtons(true);

         updateStatus(
             'success',
             `Successfully loaded ${restaurants.length} restaurants`
         );

     } catch (error) {
         console.error('Manual load failed:', error);
         restaurants = [];
         toggleMethodButtons(false);
         updateStatus('error', 'Failed to load data');
     }
 }

 // Reset everything
 function resetTutorial() {
     restaurants = [];

     toggleMethodButtons(false);
     updateStatus('ready', 'Ready to load data');

     // Clear all displays
     document.querySelector('#restaurant-list').innerHTML =
         '<p class="placeholder">Load data first, then click to display all restaurants</p>';

     document.querySelector('#filtered-list').innerHTML =
         '<p class="placeholder">Load data first, then click to show only affordable restaurants</p>';

     document.querySelector('#mapped-list').innerHTML =
         '<p class="placeholder">Load data first, then click to show just the restaurant names</p>';

     document.querySelector('#error-display').innerHTML =
         '<p class="placeholder">Click to see error handling in action</p>';

     const loadButton = document.querySelector('#load-data-button');
     loadButton.disabled = false;
     loadButton.textContent = 'Load Restaurant Data';

     console.log('Tutorial reset');
 }

 // Call these functions in the browser console:
 // checkDataStatus() - see if data is loaded
 // manualLoadData() - load data without clicking button
 // resetTutorial() - reset everything for testing
