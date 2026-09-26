const vendors = [
    {
        name: "Taco El Barrio",
        cuisine: "mexican",
        price: "$$",
        rating: 4.7,
        distance: 0.8,
        location: "12th & Market",
        latitude: 39.9526,
        longitude: -75.1652,
        open: true,
        description: "Street-style tacos and Mexican favorites."
    },

    {
        name: "Halal Cart Philly",
        cuisine: "halal",
        price: "$",
        rating: 4.8,
        distance: 1.2,
        location: "Broad & Arch",
        latitude: 39.9540,
        longitude: -75.1655,
        open: true,
        description: "Chicken, lamb, rice, and fresh street-food plates."
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
        description: "Fresh grilled sandwiches and loaded fries."
    },

    {
        name: "Sweet Treats Truck",
        cuisine: "dessert",
        price: "$$",
        rating: 4.6,
        distance: 1.7,
        location: "South Street",
        latitude: 39.9410,
        longitude: -75.1495,
        open: false,
        description: "Ice cream, cookies, and Philly-inspired desserts."
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
        description: "Quick slices and classic pizza."
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
        description: "Rice bowls with vegetables, chicken, and tofu."
    }
];

const vendorList = document.getElementById("vendorList");
const vendorCount = document.getElementById("vendorCount");

function displayVendors(vendorArray) {

    vendorList.innerHTML = "";

    vendorCount.textContent = `${vendorArray.length} vendors`;

    vendorArray.forEach(vendor => {

        const card = document.createElement("article");

        card.className = "vendor-card";

        card.innerHTML = `
            <div class="vendor-card-content">

                <div class="vendor-title-row">
                    <h3>${vendor.name}</h3>
                    <span class="rating">⭐ ${vendor.rating}</span>
                </div>

                <p class="vendor-description">
                    ${vendor.description}
                </p>

                <div class="vendor-info">
                    <span>${vendor.cuisine}</span>
                    <span>${vendor.price}</span>
                    <span>${vendor.distance} mi</span>
                </div>

                <p class="vendor-location">
                    📍 ${vendor.location}
                </p>

                <p class="${vendor.open ? "open" : "closed"}">
                    ${vendor.open ? "● Open now" : "● Closed"}
                </p>

                <button class="view-vendor">
                    View Vendor
                </button>

            </div>
        `;

        vendorList.appendChild(card);
    });
}

displayVendors(vendors);


const searchInput = document.getElementById("searchInput");
const cuisineFilter = document.getElementById("cuisineFilter");
const priceFilter = document.getElementById("priceFilter");
const openNowFilter = document.getElementById("openNowFilter");


function filterVendors() {

    const searchText = searchInput.value.toLowerCase();
    const cuisine = cuisineFilter.value;
    const price = priceFilter.value;
    const openOnly = openNowFilter.checked;

    const filteredVendors = vendors.filter(vendor => {

        const matchesSearch =
            vendor.name.toLowerCase().includes(searchText) ||
            vendor.cuisine.toLowerCase().includes(searchText) ||
            vendor.description.toLowerCase().includes(searchText);

        const matchesCuisine =
            cuisine === "all" ||
            vendor.cuisine === cuisine;

        const matchesPrice =
            price === "all" ||
            vendor.price === price;

        const matchesOpen =
            !openOnly ||
            vendor.open;

        return (
            matchesSearch &&
            matchesCuisine &&
            matchesPrice &&
            matchesOpen
        );
    });

    displayVendors(filteredVendors);
}


searchInput.addEventListener("input", filterVendors);

cuisineFilter.addEventListener("change", filterVendors);

priceFilter.addEventListener("change", filterVendors);

openNowFilter.addEventListener("change", filterVendors);

const map = L.map("map").setView(
    [39.9526, -75.1652],
    13
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);

vendors.forEach(vendor => {

    const marker = L.marker([
        vendor.latitude,
        vendor.longitude
    ]).addTo(map);

    marker.bindPopup(`
        <strong>${vendor.name}</strong><br>
        ⭐ ${vendor.rating}<br>
        ${vendor.cuisine}<br>
        ${vendor.price}<br>
        ${vendor.location}
    `);

});