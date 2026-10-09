// ============================================
// TUTORIAL 5: ARRAY METHODS FOR DATA
// From ONE element to MANY elements
// ============================================

// Restaurant data - this is what we'll work with
const restaurants = [
    {
        id: 1,
        name: "Milano's Italian Restaurant",
        cuisine: "Italian",
        rating: 4.5,
        priceRange: "$$",
        neighborhood: "College Park",
        hours: "11am-10pm",
        specialties: ["pasta", "pizza"],
        phoneNumber: "(301) 555-0123"
    },
    {
        id: 2,
        name: "Sakura Sushi",
        cuisine: "Japanese",
        rating: 4.2,
        priceRange: "$$$",
        neighborhood: "Downtown",
        hours: "5pm-11pm",
        specialties: ["sushi", "ramen"],
        phoneNumber: "(301) 555-0456"
    },
    {
        id: 3,
        name: "Border Café",
        cuisine: "Mexican",
        rating: 4.0,
        priceRange: "$",
        neighborhood: "University District",
        hours: "10am-12am",
        specialties: ["tacos", "burritos"],
        phoneNumber: "(301) 555-0789"
    },
    {
        id: 4,
        name: "The Brass Elephant",
        cuisine: "American",
        rating: 4.8,
        priceRange: "$$$$",
        neighborhood: "Historic District",
        hours: "5pm-10pm",
        specialties: ["steaks", "seafood"],
        phoneNumber: "(301) 555-0012"
    },
    {
        id: 5,
        name: "Pho Corner",
        cuisine: "Vietnamese",
        rating: 4.3,
        priceRange: "$",
        neighborhood: "College Park",
        hours: "11am-9pm",
        specialties: ["pho", "banh mi"],
        phoneNumber: "(301) 555-0345"
    },
    {
        id: 6,
        name: "Tandoor Palace",
        cuisine: "Indian",
        rating: 4.1,
        priceRange: "$$",
        neighborhood: "Downtown",
        hours: "12pm-10pm",
        specialties: ["curry", "naan"],
        phoneNumber: "(301) 555-0678"
    },
    {
        id: 7,
        name: "Le Petit Bistro",
        cuisine: "French",
        rating: 4.6,
        priceRange: "$$$",
        neighborhood: "Historic District",
        hours: "6pm-10pm",
        specialties: ["wine", "cheese"],
        phoneNumber: "(301) 555-0901"
    },
    {
        id: 8,
        name: "Seoul Kitchen",
        cuisine: "Korean",
        rating: 4.4,
        priceRange: "$$",
        neighborhood: "University District",
        hours: "11am-11pm",
        specialties: ["bbq", "kimchi"],
        phoneNumber: "(301) 555-0234"
    }
];

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tutorial 5: Array methods ready!');
    console.log(`We have ${restaurants.length} restaurants to work with`);

    // ============================================
    // METHOD 1: forEach
    // Display every restaurant name and cuisine
    // ============================================

    const displayButton = document.querySelector('#display-button');
    const restaurantList = document.querySelector('#restaurant-list');

    displayButton.addEventListener('click', () => {
        restaurantList.innerHTML = '';

        restaurants.forEach((restaurant) => {
            restaurantList.innerHTML += `
                <div class="restaurant-item">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                </div>
            `;
        });

        console.log('Displayed all restaurants using forEach');
    });


    // ============================================
    // METHOD 2: filter
    // Show only restaurants with $ or $$ price range
    // ============================================

    const filterButton = document.querySelector('#filter-button');
    const filteredList = document.querySelector('#filtered-list');

    filterButton.addEventListener('click', () => {
        const cheapRestaurants = restaurants.filter((restaurant) => {
            return restaurant.priceRange === '$' ||
                   restaurant.priceRange === '$$';
        });

        filteredList.innerHTML = '';

        cheapRestaurants.forEach((restaurant) => {
            filteredList.innerHTML += `
                <div class="restaurant-item">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                    <span class="restaurant-price">${restaurant.priceRange}</span>
                </div>
            `;
        });

        console.log('Showed cheap restaurants using filter');
    });


    // ============================================
    // METHOD 3: map
    // Create a new array containing only names
    // ============================================

    const mapButton = document.querySelector('#map-button');
    const mappedList = document.querySelector('#mapped-list');

    mapButton.addEventListener('click', () => {
        const names = restaurants.map((restaurant) => {
            return restaurant.name;
        });

        mappedList.innerHTML = '<ul class="name-list"></ul>';

        const nameList = mappedList.querySelector('.name-list');

        names.forEach((name) => {
            nameList.innerHTML += `<li>${name}</li>`;
        });

        console.log('Showed restaurant names using map');
    });


    // ============================================
    // METHOD 4: find
    // Find the restaurant with rating 4.8
    // ============================================

    const findButton = document.querySelector('#find-button');
    const foundItem = document.querySelector('#found-item');

    findButton.addEventListener('click', () => {
        const bestRestaurant = restaurants.find((restaurant) => {
            return restaurant.rating === 4.8;
        });

        if (bestRestaurant) {
            foundItem.innerHTML = `
                <div class="found-restaurant">
                    <div class="restaurant-name">
                        ${bestRestaurant.name}
                    </div>

                    <div class="restaurant-cuisine">
                        ${bestRestaurant.cuisine}
                    </div>

                    <div class="restaurant-rating">
                        Rating: ${bestRestaurant.rating}
                    </div>
                </div>
            `;
        }

        console.log('Found best restaurant using find');
    });
});


// ============================================
// HELPER FUNCTIONS FOR DEBUGGING
// ============================================

// Show what each method returns
function demonstrateMethods() {
    console.log('=== Method Demonstrations ===');

    // forEach
    console.log('forEach example:');

    restaurants.forEach((restaurant) => {
        console.log(`- ${restaurant.name} (${restaurant.cuisine})`);
    });

    // filter
    const cheap = restaurants.filter((restaurant) => {
        return restaurant.priceRange === '$' ||
               restaurant.priceRange === '$$';
    });

    console.log(
        'filter example (cheap restaurants):',
        cheap.length,
        'found'
    );

    // map
    const names = restaurants.map((restaurant) => {
        return restaurant.name;
    });

    console.log('map example (names):', names);

    // find
    const best = restaurants.find((restaurant) => {
        return restaurant.rating === 4.8;
    });

    console.log(
        'find example (best):',
        best ? best.name : 'not found'
    );
}


// Clear all displays
function clearAllDisplays() {
    document.querySelector('#restaurant-list').innerHTML =
        '<p class="placeholder">Click button to display all restaurants</p>';

    document.querySelector('#filtered-list').innerHTML =
        '<p class="placeholder">Click button to show only affordable restaurants</p>';

    document.querySelector('#mapped-list').innerHTML =
        '<p class="placeholder">Click button to show just the restaurant names</p>';

    document.querySelector('#found-item').innerHTML =
        '<p class="placeholder">Click button to find the highest rated restaurant</p>';

    console.log('All displays cleared');
}

// Call these in the browser console:
// demonstrateMethods()
// clearAllDisplays()