const FAVORITES_KEY = "phillyStreetFoodFavorites";


// Get saved favorites from the browser (shared with the rest of the site)

function getFavorites() {

    const savedFavorites =
        localStorage.getItem(FAVORITES_KEY);


    if (!savedFavorites) {

        return [];

    }


    try {

        const parsed =
            JSON.parse(savedFavorites);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        return [];

    }

}


// Save favorites to the browser

function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


// Only show favorited vendors when arriving via a "View favorites" link

const onlyFavorites =
    new URLSearchParams(window.location.search)
        .get("favorites") === "true";


const vendors = [

    {
        name: "Taco El Barrio",
        cuisine: "mexican",
        price: "$$",
        rating: 4.8,
        distance: 0.8,
        location: "Center City",
        latitude: 39.9526,
        longitude: -75.1652,
        open: true,
        emoji: "🌮",
        description:
            "Street-style tacos and Mexican favorites."
    },

    {
        name: "Halal Cart Philly",
        cuisine: "halal",
        price: "$",
        rating: 4.7,
        distance: 1.2,
        location: "University City",
        latitude: 39.9540,
        longitude: -75.1655,
        open: true,
        emoji: "🍗",
        description:
            "Chicken, lamb, rice, and fresh street-food plates."
    },

    {
        name: "Philly Fresh Grill",
        cuisine: "american",
        price: "$$",
        rating: 4.5,
        distance: 1.5,
        location: "15th & Chestnut",
        latitude: 39.9505,
        longitude: -75.1630,
        open: true,
        emoji: "🍔",
        description:
            "Fresh grilled sandwiches and loaded fries."
    },

    {
        name: "Sweet Treats Truck",
        cuisine: "dessert",
        price: "$$",
        rating: 4.9,
        distance: 1.7,
        location: "South Street",
        latitude: 39.9410,
        longitude: -75.1495,
        open: false,
        emoji: "🧁",
        description:
            "Ice cream, cookies, and Philly-inspired desserts."
    },

    {
        name: "South Street Slices",
        cuisine: "pizza",
        price: "$",
        rating: 4.4,
        distance: 2.0,
        location: "South Street",
        latitude: 39.9415,
        longitude: -75.1475,
        open: true,
        emoji: "🍕",
        description:
            "Quick slices and classic pizza."
    },

    {
        name: "Philly Rice Bowl",
        cuisine: "asian",
        price: "$$",
        rating: 4.7,
        distance: 2.3,
        location: "University City",
        latitude: 39.9530,
        longitude: -75.1930,
        open: true,
        emoji: "🍚",
        description:
            "Rice bowls with vegetables, chicken, and tofu."
    }

];


const vendorList =
    document.getElementById("vendorList");

const vendorCount =
    document.getElementById("vendorCount");

const searchInput =
    document.getElementById("searchInput");

const cuisineFilter =
    document.getElementById("cuisineFilter");

const priceFilter =
    document.getElementById("priceFilter");

const openNowFilter =
    document.getElementById("openNowFilter");


// ========================================
// DISPLAY VENDORS
// ========================================

function displayVendors(list) {

    vendorList.innerHTML = "";

    vendorCount.textContent =
        `${list.length} vendors`;


    if (list.length === 0) {

        vendorList.innerHTML = `

            <div class="no-results">

                <h3>
                    No vendors found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;
    }


    list.forEach(function (vendor) {

        const favorite =
            getFavorites().includes(vendor.name);


        const card =
            document.createElement("article");

        card.className = "vendor-card";


        card.innerHTML = `

            <div class="vendor-card-top">

                <span class="vendor-emoji">
                    ${vendor.emoji}
                </span>

                <button
                    class="explore-favorite-button
                    ${favorite ? "is-favorite" : ""}"
                    data-vendor="${vendor.name}"
                    type="button"
                    aria-label="Favorite ${vendor.name}"
                >
                    ${favorite ? "♥" : "♡"}
                </button>

            </div>


            <div class="vendor-card-content">

                <div class="vendor-title-row">

                    <h3>
                        ${vendor.name}
                    </h3>

                    <span class="rating">
                        ⭐ ${vendor.rating}
                    </span>

                </div>


                <p class="vendor-description">
                    ${vendor.description}
                </p>


                <div class="vendor-info">

                    <span>
                        ${vendor.cuisine}
                    </span>

                    <span>
                        ${vendor.price}
                    </span>

                    <span>
                        ${vendor.distance} mi
                    </span>

                </div>


                <p class="vendor-location">
                    📍 ${vendor.location}
                </p>


                <p class="${vendor.open ? "open" : "closed"}">
                    ${vendor.open ? "● Open now" : "● Closed"}
                </p>


                <div class="vendor-actions">

                    <button
                        class="view-vendor"
                        data-vendor="${vendor.name}"
                        type="button"
                    >
                        View Menu →
                    </button>

                </div>

            </div>

        `;


        vendorList.appendChild(card);

    });


    attachVendorEvents();

}


// ========================================
// FAVORITE / MENU BUTTONS
// ========================================

function attachVendorEvents() {

    document.querySelectorAll(
        ".explore-favorite-button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const vendor =
                    button.dataset.vendor;


                const favorites =
                    getFavorites();

                const existingIndex =
                    favorites.indexOf(vendor);


                if (existingIndex !== -1) {

                    favorites.splice(existingIndex, 1);

                } else {

                    favorites.push(vendor);

                }


                saveFavorites(favorites);


                displayVendors(
                    getFilteredVendors()
                );

            }
        );

    });


    document.querySelectorAll(
        ".view-vendor"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const vendor =
                    button.dataset.vendor;


                window.location.href =
                    "order.html?vendor=" +
                    encodeURIComponent(vendor);

            }
        );

    });

}


// ========================================
// FILTER
// ========================================

function getFilteredVendors() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const cuisine =
        cuisineFilter.value;

    const price =
        priceFilter.value;

    const openOnly =
        openNowFilter.checked;


    return vendors.filter(function (vendor) {

        const matchesSearch =
            vendor.name
                .toLowerCase()
                .includes(searchText) ||

            vendor.cuisine
                .toLowerCase()
                .includes(searchText) ||

            vendor.description
                .toLowerCase()
                .includes(searchText);


        const matchesCuisine =
            cuisine === "all" ||
            vendor.cuisine === cuisine;


        const matchesPrice =
            price === "all" ||
            vendor.price === price;


        const matchesOpen =
            !openOnly ||
            vendor.open;


        const matchesFavorites =
            !onlyFavorites ||
            getFavorites().includes(vendor.name);


        return (
            matchesSearch &&
            matchesCuisine &&
            matchesPrice &&
            matchesOpen &&
            matchesFavorites
        );

    });

}


function filterVendors() {

    displayVendors(
        getFilteredVendors()
    );

}


searchInput.addEventListener(
    "input",
    filterVendors
);

cuisineFilter.addEventListener(
    "change",
    filterVendors
);

priceFilter.addEventListener(
    "change",
    filterVendors
);

openNowFilter.addEventListener(
    "change",
    filterVendors
);


// ========================================
// MAP
// ========================================

const map =
    L.map("map", {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView(
        [39.9526, -75.1652],
        13
    );


L.maplibreGL({

    style:
        "https://tiles.openfreemap.org/styles/positron"

}).addTo(map);


map.attributionControl.addAttribution(
    "OpenFreeMap © OpenMapTiles Data from OpenStreetMap"
);


// ========================================
// MARKERS
// ========================================

vendors.forEach(function (vendor) {

    const marker =
        L.marker([
            vendor.latitude,
            vendor.longitude
        ]).addTo(map);


    marker.bindPopup(`

        <div class="map-popup">

            <strong>
                ${vendor.emoji}
                ${vendor.name}
            </strong>

            <br>

            ⭐ ${vendor.rating}

            <br>

            ${vendor.cuisine}

            <br>

            ${vendor.price}

            <br>

            📍 ${vendor.location}

            <br><br>

            <button
                onclick="openVendorMenu('${vendor.name.replace(/'/g, "\\'")}')"
                class="map-menu-button"
            >
                View Menu →
            </button>

        </div>

    `);


    vendor.marker = marker;

});


// ========================================
// MAP → ORDER
// ========================================

function openVendorMenu(vendorName) {

    window.location.href =
        "order.html?vendor=" +
        encodeURIComponent(
            vendorName
        );

}


// ========================================
// START
// ========================================

if (onlyFavorites) {

    const panelHeading =
        document.querySelector(
            ".vendors-panel .panel-heading .mini-label"
        );

    const panelTitle =
        document.querySelector(
            ".vendors-panel .panel-heading h2"
        );

    if (panelHeading) {

        panelHeading.textContent =
            "YOUR FAVORITES";

    }

    if (panelTitle) {

        panelTitle.textContent =
            "Favorite Vendors";

    }

}


displayVendors(getFilteredVendors());