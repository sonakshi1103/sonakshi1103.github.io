
 // ============================================
 // TUTORIAL 8: STUDENT WORK FILE
 // Complete the three library integration examples
 // ============================================

import {
    handleAnimationError,
    getRestaurantCoordinates,
    handleMapError,
    handleChartError,
    createRestaurantCards,
    clearExistingMap,
    restaurants,
    clickToLoad
} from './tutorial-support.js';

// Global variables for your library instances
let myChart = null;
let myMap = null;

// Wait for page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 8: Student work file ready!');

    // Set up your event listeners
    document.querySelector('#load-data-button').addEventListener('click', function(event) {
        clickToLoad(event.target);
    });

    document.querySelector('#chart-button').addEventListener('click', createMyChart);
    document.querySelector('#map-button').addEventListener('click', createMyMap);
    document.querySelector('#animation-button').addEventListener('click', animateMyCards);
});

// ============================================
// EXAMPLE 1: CHART.JS - COMPLETED
// ============================================

function createMyChart() {
    // Step 1: Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        alert('Chart.js not available. Check console.');
        return;
    }

    if (restaurants.length === 0) {
        alert('No data loaded. Click "Load Data" first.');
        return;
    }

    // Step 2: Process the restaurant data for charting
    const cuisineCounts = {};

    restaurants.forEach(function(restaurant) {
        const cuisine = restaurant.cuisine || 'Unknown';
        cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
    });

    // Step 3: Transform counts into Chart.js format
    const chartLabels = Object.keys(cuisineCounts);
    const chartData = Object.values(cuisineCounts);

    console.log('Chart data prepared:', {
        labels: chartLabels,
        data: chartData
    });

    try {
        // Step 4: Get canvas and clear existing chart
        const canvas = document.querySelector('#restaurant-chart');
        const ctx = canvas.getContext('2d');

        if (myChart) {
            myChart.destroy();
            myChart = null;
        }

        // Step 5: Create the Chart.js chart
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Number of Restaurants',
                    data: chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Restaurant Distribution by Cuisine Type'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Number of Restaurants'
                        }
                    }
                }
            }
        });

        console.log('Chart created successfully!');

    } catch (error) {
        handleChartError(error);
    }
}

// ============================================
// EXAMPLE 2: LEAFLET.JS - COMPLETED
// ============================================

function createMyMap() {
    // Step 1: Check if Leaflet is available
    if (typeof L === 'undefined') {
        alert('Leaflet.js not available. Check console.');
        return;
    }

    if (restaurants.length === 0) {
        alert('No data loaded. Click "Load Data" first.');
        return;
    }

    try {
        // Step 2: Remove the previous map if it exists
        if (myMap) {
            myMap.remove();
            myMap = null;
        }

        clearExistingMap();

        // Step 3: Create the map
        myMap = L.map('restaurant-map').setView([38.9897, -76.9378], 12);

        // Step 4: Add map tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(myMap);

        // Step 5: Add markers for restaurants
        const restaurantsWithLocation = restaurants.filter(function(restaurant) {
            return restaurant.neighborhood &&
                   restaurant.neighborhood !== 'Unknown';
        });

        restaurantsWithLocation.forEach(function(restaurant, index) {
            // Get coordinates from support file
            const coords = getRestaurantCoordinates(restaurant, index);

            // Create a marker at the coordinates
            const marker = L.marker(coords);

            // Create popup content with restaurant information
            const popupContent = `
                <div style="text-align: center;">
                    <strong>${restaurant.name || 'Unknown Restaurant'}</strong><br>
                    <em>${restaurant.cuisine || 'Unknown'} cuisine</em><br>
                    Rating: ${restaurant.rating ?? 'N/A'}★<br>
                    <small>${restaurant.neighborhood || 'Unknown location'}</small>
                </div>
            `;

            // Bind popup to marker and add to map
            marker.bindPopup(popupContent).addTo(myMap);
        });

        console.log(`Map created with ${restaurantsWithLocation.length} restaurants!`);

    } catch (error) {
        handleMapError(error);
    }
}

// ============================================
// EXAMPLE 3: GSAP - COMPLETED
// ============================================

function animateMyCards() {
    // Step 1: Check if GSAP is available
    if (typeof gsap === 'undefined') {
        alert('GSAP not available. Check console.');
        return;
    }

    if (restaurants.length === 0) {
        alert('No data loaded. Click "Load Data" first.');
        return;
    }

    try {
        // Step 2: Clear and create restaurant cards
        createRestaurantCards();

        // Step 3: Find a highly rated restaurant
        const topRestaurant = restaurants.find(function(restaurant) {
            return restaurant.rating && restaurant.rating >= 4.5;
        });

        if (topRestaurant) {
            console.log('Found top-rated restaurant:', topRestaurant.name);
        }

        // Step 4: Animate the restaurant cards
        gsap.fromTo('.restaurant-card',

            // FROM state
            {
                opacity: 0,
                scale: 0.8,
                y: 50
            },

            // TO state
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            }
        );

        console.log('Animation created successfully!');

    } catch (error) {
        handleAnimationError(error);
    }
}

// ============================================
// DEBUGGING HELPERS
// ============================================

function testMyWork() {
    console.log('Testing your implementations...');

    if (restaurants.length > 0) {
        console.log('Data loaded:', restaurants.length, 'restaurants');

        // Test each function
        console.log('Testing Chart.js...');
        createMyChart();

        setTimeout(() => {
            console.log('Testing Leaflet.js...');
            createMyMap();

            setTimeout(() => {
                console.log('Testing GSAP...');
                animateMyCards();
            }, 1000);

        }, 1000);

    } else {
        console.log('No restaurant data loaded. Click "Load Data" first.');
    }
}

// Make testing function available in browser console
window.testMyWork = testMyWork;
