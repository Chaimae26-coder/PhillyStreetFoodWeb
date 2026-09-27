/* ========================================
   PHILLY STREET FOOD
   HOME PAGE JAVASCRIPT
======================================== */


/* ========================================
   FAVORITES STORAGE
======================================== */

const FAVORITES_KEY =
    "phillyStreetFoodFavorites";


function getFavorites() {

    const savedFavorites =
        localStorage.getItem(
            FAVORITES_KEY
        );


    if (!savedFavorites) {

        return [];

    }


    try {

        const parsed =
            JSON.parse(savedFavorites);


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        return [];

    }

}


function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


/* ========================================
   VENDOR DATA
======================================== */

const vendors = [

    {
        name: "Taco El Barrio",

        cuisineClass: "",

        cuisine: "Mexican",

        price: "$$",

        rating: 4.8,

        location: "12th & Market",

        open: true,

        emoji: "🌮",

        description:
            "Street-style tacos and Mexican favorites."
    },


    {
        name: "Halal Cart Philly",

        cuisineClass: "halal",

        cuisine: "Halal",

        price: "$",

        rating: 4.7,

        location: "Broad & Arch",

        open: true,

        emoji: "🍗",

        description:
            "Chicken, lamb, rice, and fresh street-food plates."
    },


    {
        name: "Philly Fresh Grill",

        cuisineClass: "grill",

        cuisine: "American",

        price: "$$",

        rating: 4.5,

        location: "15th & Chestnut",

        open: true,

        emoji: "🍔",

        description:
            "Fresh grilled sandwiches and loaded fries."
    },


    {
        name: "Sweet Treats Truck",

        cuisineClass: "dessert",

        cuisine: "Dessert",

        price: "$$",

        rating: 4.9,

        location: "South Street",

        open: false,

        emoji: "🧁",

        description:
            "Ice cream, cookies, and Philly-inspired desserts."
    },


    {
        name: "South Street Slices",

        cuisineClass: "pizza",

        cuisine: "Pizza",

        price: "$",

        rating: 4.4,

        location: "South Street",

        open: true,

        emoji: "🍕",

        description:
            "Quick slices and classic pizza."
    },


    {
        name: "Philly Rice Bowl",

        cuisineClass: "rice",

        cuisine: "Asian",

        price: "$$",

        rating: 4.7,

        location: "University City",

        open: true,

        emoji: "🍚",

        description:
            "Rice bowls with vegetables, chicken, and tofu."
    }

];


/* ========================================
   MAIN SEARCH
======================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchButton =
    document.getElementById(
        "searchButton"
    );


function goToSearchResults() {

    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value.trim();


    if (searchText === "") {

        searchInput.focus();

        searchInput.placeholder =
            "Try tacos, halal, pizza...";

        return;

    }


    window.location.href =
        "explore.html?search=" +
        encodeURIComponent(
            searchText
        );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        goToSearchResults
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                goToSearchResults();

            }

        }
    );

}


/* ========================================
   TOP SEARCH BUTTON
======================================== */

const topSearchButton =
    document.getElementById(
        "topSearchButton"
    );


if (topSearchButton) {

    topSearchButton.addEventListener(
        "click",
        function () {

            const mainSearch =
                document.getElementById(
                    "mainSearch"
                );


            if (mainSearch) {

                mainSearch.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }


            setTimeout(
                function () {

                    if (searchInput) {

                        searchInput.focus();

                    }

                },
                400
            );

        }
    );

}


/* ========================================
   TOP FAVORITES BUTTON
======================================== */

const topLikeButton =
    document.getElementById(
        "topLikeButton"
    );


const topLikeHeart =
    topLikeButton
        ? topLikeButton.querySelector("span")
        : null;


const favoriteCountBadge =
    document.getElementById(
        "favoriteCount"
    );


function updateFavoriteBadge() {

    const count =
        getFavorites().length;


    if (favoriteCountBadge) {

        favoriteCountBadge.textContent =
            count;

    }


    if (
        topLikeHeart &&
        topLikeButton
    ) {

        if (count > 0) {

            topLikeHeart.textContent =
                "♥";

            topLikeButton.classList.add(
                "has-favorites"
            );

        } else {

            topLikeHeart.textContent =
                "♡";

            topLikeButton.classList.remove(
                "has-favorites"
            );

        }

    }

}


updateFavoriteBadge();


/* ========================================
   FEATURED VENDOR
======================================== */

const featuredVendorContainer =
    document.getElementById(
        "featuredVendorContainer"
    );


const featuredSubtitle =
    document.getElementById(
        "featuredSubtitle"
    );


function removeFavorite(vendorName) {

    const favorites =
        getFavorites().filter(
            function (name) {

                return name !== vendorName;

            }
        );


    saveFavorites(
        favorites
    );


    updateFavoriteBadge();

    renderFeaturedVendor();

}


function renderFeaturedVendor() {

    if (!featuredVendorContainer) {

        return;

    }


    const favorites =
        getFavorites();


    const featuredVendor =
        vendors.find(
            function (vendor) {

                return favorites.includes(
                    vendor.name
                );

            }
        );


    /* --------------------------------
       NO FAVORITE
    -------------------------------- */

    if (!featuredVendor) {

        if (featuredSubtitle) {

            featuredSubtitle.textContent =
                "Save a vendor in Explore and it will appear here.";

        }


        featuredVendorContainer.innerHTML = `

            <div class="empty-featured">

                <div class="empty-featured-icon">
                    ❤️
                </div>


                <h3>
                    Your favorite vendors will appear here
                </h3>


                <p>
                    Explore Philly street food and tap
                    the heart on any vendor you want to save.
                </p>


                <a
                    href="explore.html"
                    class="empty-featured-button"
                >
                    Explore Street Food →
                </a>

            </div>

        `;


        return;

    }


    /* --------------------------------
       FAVORITE FOUND
    -------------------------------- */

    if (featuredSubtitle) {

        featuredSubtitle.textContent =
            "Your saved favorite, ready when you are.";

    }


    featuredVendorContainer.innerHTML = `

        <article class="featured-vendor-card">


            <div
                class="
                    featured-vendor-image
                    ${featuredVendor.cuisineClass}
                "
            >

                <span class="featured-food-emoji">
                    ${featuredVendor.emoji}
                </span>


                <span
                    class="
                        featured-open
                        ${featuredVendor.open
                            ? ""
                            : "closed"}
                    "
                >

                    ${
                        featuredVendor.open
                            ? "● Open now"
                            : "● Closed"
                    }

                </span>


                <button
                    class="featured-favorite active"
                    type="button"
                    aria-label="Remove ${featuredVendor.name} from favorites"
                >
                    ♥
                </button>

            </div>


            <div class="featured-vendor-content">


                <span class="eyebrow">

                    ${featuredVendor.cuisine}

                    •

                    ${featuredVendor.price}

                </span>


                <h3>
                    ${featuredVendor.name}
                </h3>


                <p class="featured-vendor-description">

                    ${featuredVendor.description}

                </p>


                <div class="featured-vendor-info">

                    <span>
                        ⭐ ${featuredVendor.rating}
                    </span>

                </div>


                <p class="featured-vendor-location">

                    📍 ${featuredVendor.location}

                </p>


                <div class="featured-actions">


                    <a
                        href="order.html?vendor=${encodeURIComponent(
                            featuredVendor.name
                        )}"
                        class="featured-vendor-button"
                    >
                        Order Now →
                    </a>


                    <a
                        href="explore.html?search=${encodeURIComponent(
                            featuredVendor.name
                        )}"
                        class="featured-view-button"
                    >
                        View Vendor
                    </a>

                </div>

            </div>

        </article>

    `;


    const removeButton =
        featuredVendorContainer.querySelector(
            ".featured-favorite"
        );


    if (removeButton) {

        removeButton.addEventListener(
            "click",
            function () {

                removeFavorite(
                    featuredVendor.name
                );

            }
        );

    }

}


renderFeaturedVendor();


/* ========================================
   CATEGORY BUTTONS
======================================== */

const categoryButtons =
    document.querySelectorAll(
        ".category-card"
    );


categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const category =
                    button.dataset.category ||
                    button
                        .querySelector(
                            "span:last-child"
                        )
                        ?.textContent
                        .trim() ||
                    "";


                if (!category) {

                    return;

                }


                window.location.href =
                    "explore.html?search=" +
                    encodeURIComponent(
                        category
                    );

            }
        );

    }
);


/* ========================================
   MOBILE MENU
======================================== */

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    mobileMenuButton &&
    mobileMenu
) {


    mobileMenuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileMenu.classList.toggle(
                    "open"
                );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );


            mobileMenuButton.textContent =
                isOpen
                    ? "✕"
                    : "☰";

        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "open"
                    );


                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    mobileMenuButton.textContent =
                        "☰";

                }
            );

        }
    );

}


/* ========================================
   KEEP FAVORITES UPDATED
======================================== */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === FAVORITES_KEY
        ) {

            updateFavoriteBadge();

            renderFeaturedVendor();

        }

    }
);