// ========================================
// MAIN SEARCH
// ========================================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");


searchButton.addEventListener("click", function () {

    const searchText =
        searchInput.value.trim();


    if (searchText === "") {

        alert(
            "What are you craving? Try tacos, halal, pizza, or desserts."
        );

        searchInput.focus();

        return;
    }


    alert(
        "Searching Philly Street Food for: " +
        searchText
    );

});


/* Press Enter to search */

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchButton.click();

        }

    }
);



// ========================================
// TOP SEARCH BUTTON
// ========================================

const topSearchButton =
    document.getElementById("topSearchButton");


topSearchButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("mainSearch")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        setTimeout(function () {

            searchInput.focus();

        }, 500);

    }
);



// ========================================
// TOP LIKE BUTTON
// ========================================

const topLikeButton =
    document.getElementById("topLikeButton");


topLikeButton.addEventListener(
    "click",
    function () {

        if (topLikeButton.textContent === "♡") {

            topLikeButton.textContent = "♥";

            topLikeButton.style.background =
                "#F0641E";

            topLikeButton.style.color =
                "#FFFFFF";

            topLikeButton.style.borderColor =
                "#F0641E";

        } else {

            topLikeButton.textContent = "♡";

            topLikeButton.style.background =
                "#FFFFFF";

            topLikeButton.style.color =
                "#12233F";

            topLikeButton.style.borderColor =
                "#12233F";

        }

    }
);



// ========================================
// VENDOR FAVORITES
// ========================================

const favoriteButtons =
    document.querySelectorAll(
        ".favorite-button"
    );


favoriteButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            if (button.textContent === "♡") {

                button.textContent = "♥";

            } else {

                button.textContent = "♡";

            }

        }
    );

});



// ========================================
// VENDOR BUTTONS
// ========================================

const vendorButtons =
    document.querySelectorAll(
        ".vendor-button"
    );


vendorButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const vendorName =
                button.dataset.vendor;


            alert(
                "You selected " +
                vendorName +
                ". Vendor details will open here soon!"
            );

        }
    );

});



// ========================================
// CATEGORY BUTTONS
// ========================================

const categoryButtons =
    document.querySelectorAll(
        ".category-card"
    );


categoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const category =
                button.querySelector(
                    "span:last-child"
                ).textContent;


            searchInput.value =
                category;


            searchInput.focus();


            document
                .getElementById("mainSearch")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }
    );

});



// ========================================
// MOBILE MENU
// ========================================

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


mobileMenuButton.addEventListener(
    "click",
    function () {

        mobileMenu.classList.toggle(
            "open"
        );

    }
);


const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            mobileMenu.classList.remove(
                "open"
            );

        }
    );

});