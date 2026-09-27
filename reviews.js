/* ========================================
   REVIEWS SYSTEM
======================================== */


/* ========================================
   ELEMENTS
======================================== */

const submitButton =
    document.getElementById(
        "submitReviewButton"
    );


const nameInput =
    document.getElementById(
        "reviewName"
    );


const ratingInput =
    document.getElementById(
        "reviewRating"
    );


const textInput =
    document.getElementById(
        "reviewText"
    );


const reviewsList =
    document.getElementById(
        "reviewsList"
    );


const message =
    document.getElementById(
        "reviewMessage"
    );


const reviewCount =
    document.getElementById(
        "reviewCount"
    );


const characterCounter =
    document.getElementById(
        "characterCount"
    );



/* ========================================
   VENDOR ELEMENTS
======================================== */

const vendorIcon =
    document.getElementById(
        "vendorIcon"
    );


const vendorNameElement =
    document.getElementById(
        "vendorName"
    );


const vendorLocation =
    document.getElementById(
        "vendorLocation"
    );


const vendorRating =
    document.getElementById(
        "vendorRating"
    );


const vendorStars =
    document.getElementById(
        "vendorStars"
    );


const favoriteButton =
    document.getElementById(
        "favoriteButton"
    );


const favoriteMessage =
    document.getElementById(
        "favoriteMessage"
    );



/* ========================================
   FAVORITE LIST ELEMENTS
======================================== */

const favoritesList =
    document.getElementById(
        "favoritesList"
    );


const favoriteCount =
    document.getElementById(
        "favoriteCount"
    );


const noFavoritesMessage =
    document.getElementById(
        "noFavoritesMessage"
    );



/* ========================================
   STORAGE
======================================== */

const STORAGE_KEY =
    "phillyStreetFoodReviews";


const FAVORITES_KEY =
    "phillyStreetFoodFavorites";



/* ========================================
   VENDOR DATA
======================================== */

const vendors = {

    "Taco El Barrio": {

        icon: "🌮",

        location:
            "📍 12th & Market St • Mexican • $",

        rating: 4.7

    },


    "Halal Cart Philly": {

        icon: "🍗",

        location:
            "📍 Broad & Arch • Halal • $",

        rating: 4.8

    },


    "Philly Fresh Grill": {

        icon: "🍔",

        location:
            "📍 15th & Chestnut • American • $$",

        rating: 4.5

    },


    "Sweet Treats Truck": {

        icon: "🍰",

        location:
            "📍 South Street • Dessert • $$",

        rating: 4.6

    },


    "South Street Slices": {

        icon: "🍕",

        location:
            "📍 South Street • Pizza • $",

        rating: 4.4

    },


    "Philly Rice Bowl": {

        icon: "🍚",

        location:
            "📍 University City • Asian • $$",

        rating: 4.7

    }

};



/* ========================================
   FAVORITES
======================================== */

function getFavorites() {

    const savedFavorites =
        localStorage.getItem(
            FAVORITES_KEY
        );


    if (!savedFavorites) {

        return [];

    }


    try {

        const favorites =
            JSON.parse(
                savedFavorites
            );


        if (
            Array.isArray(favorites)
        ) {

            return favorites;

        }


        return [];

    } catch (error) {

        return [];

    }

}



/* ========================================
   SAVE FAVORITES
======================================== */

function saveFavorites(
    favorites
) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(
            favorites
        )
    );

}



/* ========================================
   GET CURRENT VENDOR
======================================== */

function getCurrentVendor() {

    const favorites =
        getFavorites();


    /*
       If there are favorites,
       show the first favorite
       in the vendor review card.
    */

    for (
        let i = 0;
        i < favorites.length;
        i++
    ) {

        if (
            vendors[favorites[i]]
        ) {

            return favorites[i];

        }

    }


    /*
       If there are no favorites,
       keep the original demo vendor.
    */

    return "Taco El Barrio";

}



/* ========================================
   DISPLAY CURRENT VENDOR
======================================== */

function displayVendor(
    vendorName
) {

    const vendor =
        vendors[vendorName];


    if (!vendor) {

        return;

    }


    vendorNameElement.textContent =
        vendorName;


    vendorIcon.textContent =
        vendor.icon;


    vendorLocation.textContent =
        vendor.location;


    vendorRating.textContent =
        vendor.rating.toFixed(1);


    const roundedRating =
        Math.round(
            vendor.rating
        );


    vendorStars.textContent =
        "⭐".repeat(
            roundedRating
        );


    updateFavoriteButton(
        vendorName
    );

}



/* ========================================
   UPDATE FAVORITE BUTTON
======================================== */

function updateFavoriteButton(
    vendorName
) {

    const favorites =
        getFavorites();


    const isFavorite =
        favorites.includes(
            vendorName
        );


    if (isFavorite) {

        favoriteButton.textContent =
            "♥";


        favoriteButton.classList.add(
            "active"
        );


        favoriteButton.setAttribute(
            "aria-label",
            "Remove " +
            vendorName +
            " from favorites"
        );

    } else {

        favoriteButton.textContent =
            "♡";


        favoriteButton.classList.remove(
            "active"
        );


        favoriteButton.setAttribute(
            "aria-label",
            "Add " +
            vendorName +
            " to favorites"
        );

    }

}



/* ========================================
   TOGGLE FAVORITE
======================================== */

function toggleFavorite(
    vendorName
) {

    let favorites =
        getFavorites();


    const existingIndex =
        favorites.indexOf(
            vendorName
        );


    /*
       If already favorited,
       remove ONLY this vendor.
    */

    if (
        existingIndex !== -1
    ) {

        favorites.splice(
            existingIndex,
            1
        );


        showFavoriteMessage(
            vendorName +
            " removed from favorites.",
            "#dc2626"
        );

    }


    /*
       Otherwise add this vendor.
    */

    else {

        favorites.push(
            vendorName
        );


        showFavoriteMessage(
            vendorName +
            " added to favorites!",
            "#15803d"
        );

    }


    saveFavorites(
        favorites
    );


    /*
       Update everything immediately.
    */

    updateFavoriteButton(
        vendorName
    );


    renderFavoriteList();

}



/* ========================================
   FAVORITE BUTTON
======================================== */

favoriteButton.addEventListener(
    "click",
    function () {

        const vendorName =
            vendorNameElement.textContent.trim();


        if (!vendorName) {

            return;

        }


        toggleFavorite(
            vendorName
        );

    }
);



/* ========================================
   RENDER FAVORITE LIST
======================================== */

function renderFavoriteList() {

    const favorites =
        getFavorites();


    /*
       Clear old list.
    */

    favoritesList.innerHTML =
        "";


    /*
       Remove invalid vendor names.
       This protects the page if old
       localStorage data contains a
       vendor that no longer exists.
    */

    const validFavorites =
        favorites.filter(
            function (name) {

                return Boolean(
                    vendors[name]
                );

            }
        );


    /*
       Keep storage clean.
    */

    if (
        validFavorites.length !==
        favorites.length
    ) {

        saveFavorites(
            validFavorites
        );

    }



    /* --------------------------------
       NO FAVORITES
    -------------------------------- */

    if (
        validFavorites.length === 0
    ) {

        noFavoritesMessage.style.display =
            "block";


        favoriteCount.textContent =
            "0 favorites";


        return;

    }



    /* --------------------------------
       HAS FAVORITES
    -------------------------------- */

    noFavoritesMessage.style.display =
        "none";


    favoriteCount.textContent =
        validFavorites.length === 1
            ? "1 favorite"
            : `${validFavorites.length} favorites`;



    /* --------------------------------
       CREATE EACH FAVORITE
    -------------------------------- */

    validFavorites.forEach(
        function (vendorName) {

            const vendor =
                vendors[vendorName];


            const favoriteItem =
                document.createElement(
                    "div"
                );


            favoriteItem.classList.add(
                "favorite-item"
            );


            favoriteItem.innerHTML = `

                <div class="favorite-item-icon">
                    ${vendor.icon}
                </div>


                <div class="favorite-item-info">

                    <strong>
                        ${escapeHTML(vendorName)}
                    </strong>

                    <span>
                        ${escapeHTML(vendor.location)}
                    </span>

                </div>


                <button
                    type="button"
                    class="remove-favorite"
                    aria-label="Remove ${escapeHTML(vendorName)} from favorites"
                >
                    ♥
                </button>

            `;


            /*
               Clicking the truck name/card
               makes it the vendor shown
               in the review card.
            */

            favoriteItem.addEventListener(
                "click",
                function (event) {

                    /*
                       Don't trigger when
                       clicking remove.
                    */

                    if (
                        event.target.closest(
                            ".remove-favorite"
                        )
                    ) {

                        return;

                    }


                    displayVendor(
                        vendorName
                    );


                    /*
                       Scroll to vendor card.
                    */

                    document
                        .querySelector(
                            ".vendor-card"
                        )
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                }
            );


            /*
               Remove favorite button.
            */

            const removeButton =
                favoriteItem.querySelector(
                    ".remove-favorite"
                );


            removeButton.addEventListener(
                "click",
                function () {

                    removeFavorite(
                        vendorName
                    );

                }
            );


            favoritesList.appendChild(
                favoriteItem
            );

        }
    );

}



/* ========================================
   REMOVE FAVORITE
======================================== */

function removeFavorite(
    vendorName
) {

    let favorites =
        getFavorites();


    favorites =
        favorites.filter(
            function (name) {

                return (
                    name !==
                    vendorName
                );

            }
        );


    saveFavorites(
        favorites
    );


    /*
       If the removed vendor is
       currently displayed, update
       its heart.
    */

    const currentVendor =
        vendorNameElement.textContent.trim();


    if (
        currentVendor ===
        vendorName
    ) {

        updateFavoriteButton(
            vendorName
        );

    }


    showFavoriteMessage(
        vendorName +
        " removed from favorites.",
        "#dc2626"
    );


    renderFavoriteList();

}



/* ========================================
   FAVORITE MESSAGE
======================================== */

function showFavoriteMessage(
    text,
    color
) {

    favoriteMessage.textContent =
        text;


    favoriteMessage.style.color =
        color;


    favoriteMessage.style.opacity =
        "1";


    clearTimeout(
        window.favoriteMessageTimeout
    );


    window.favoriteMessageTimeout =
        setTimeout(
            function () {

                favoriteMessage.style.opacity =
                    "0";

            },
            3000
        );

}



/* ========================================
   LISTEN FOR FAVORITE CHANGES
======================================== */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            FAVORITES_KEY
        ) {

            renderFavoriteList();


            const currentVendor =
                vendorNameElement
                    .textContent
                    .trim();


            updateFavoriteButton(
                currentVendor
            );

        }

    }
);



/* ========================================
   LOAD SAVED REVIEWS
======================================== */

let savedReviews = [];


try {

    savedReviews =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || [];


    if (
        !Array.isArray(savedReviews)
    ) {

        savedReviews = [];

    }

} catch (error) {

    savedReviews = [];

}



/* ========================================
   CHARACTER COUNTER
======================================== */

if (
    characterCounter &&
    textInput
) {

    textInput.addEventListener(
        "input",
        function () {

            const length =
                textInput.value.length;


            characterCounter.textContent =
                length;

        }
    );

}



/* ========================================
   STAR DISPLAY
======================================== */

ratingInput.addEventListener(
    "change",
    function () {

        const rating =
            Number(
                ratingInput.value
            );


        if (!rating) {

            return;

        }


        showMessage(
            `${"⭐".repeat(rating)} ${rating}/5 selected`,
            "#d97706"
        );

    }
);



/* ========================================
   SUBMIT REVIEW
======================================== */

submitButton.addEventListener(
    "click",
    function () {

        const name =
            nameInput.value.trim();


        const rating =
            ratingInput.value;


        const reviewText =
            textInput.value.trim();



        /* ------------------------------
           VALIDATION
        ------------------------------ */

        if (
            name === "" ||
            rating === "" ||
            reviewText === ""
        ) {

            showMessage(
                "Please complete all fields.",
                "#dc2626"
            );


            shakeForm();


            return;

        }



        /* ------------------------------
           NAME VALIDATION
        ------------------------------ */

        if (
            name.length < 2
        ) {

            showMessage(
                "Please enter a valid name.",
                "#dc2626"
            );


            nameInput.focus();


            return;

        }



        /* ------------------------------
           REVIEW LENGTH
        ------------------------------ */

        if (
            reviewText.length < 5
        ) {

            showMessage(
                "Your review is too short.",
                "#dc2626"
            );


            textInput.focus();


            return;

        }



        /* ------------------------------
           LOADING
        ------------------------------ */

        submitButton.disabled =
            true;


        submitButton.innerHTML =
            "⏳ Posting Review...";



        /* ------------------------------
           CREATE REVIEW
        ------------------------------ */

        setTimeout(
            function () {

                const review = {

                    id:
                        Date.now(),

                    name:
                        name,

                    rating:
                        Number(
                            rating
                        ),

                    text:
                        reviewText,

                    date:
                        new Date()
                            .toLocaleDateString()

                };



                /* Save */

                savedReviews.unshift(
                    review
                );


                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(
                        savedReviews
                    )
                );



                /* Display */

                createReviewElement(
                    review,
                    true
                );



                /* Update count */

                updateReviewCount();



                /* Success */

                showMessage(
                    "✓ Thanks! Your review was added.",
                    "#15803d"
                );



                /* Reset form */

                nameInput.value =
                    "";


                ratingInput.value =
                    "";


                textInput.value =
                    "";


                if (
                    characterCounter
                ) {

                    characterCounter.textContent =
                        "0";

                }



                /* Reset button */

                submitButton.disabled =
                    false;


                submitButton.innerHTML =
                    `
                    <span>Submit Review</span>
                    <span>→</span>
                    `;


            },
            700
        );

    }
);



/* ========================================
   CREATE REVIEW
======================================== */

function createReviewElement(
    review,
    animate = false
) {

    const reviewCard =
        document.createElement(
            "div"
        );


    reviewCard.classList.add(
        "review-card"
    );


    if (animate) {

        reviewCard.style.opacity =
            "0";


        reviewCard.style.transform =
            "translateY(-20px)";

    }



    /* First letter */

    const initial =
        review.name
            .charAt(0)
            .toUpperCase();



    /* Stars */

    const stars =
        "⭐".repeat(
            review.rating
        );



    reviewCard.innerHTML = `

        <div class="review-header">

            <div class="review-user">

                <div class="avatar">
                    ${escapeHTML(initial)}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(review.name)}
                    </strong>

                    <small>
                        ${escapeHTML(review.date)}
                    </small>

                </div>

            </div>


            <span class="stars">
                ${stars}
            </span>

        </div>


        <p>
            ${escapeHTML(review.text)}
        </p>


        <button
            class="delete-review"
            data-id="${review.id}"
        >
            Remove
        </button>

    `;



    /*
       Put newest review first.
    */

    reviewsList.prepend(
        reviewCard
    );



    /* Animation */

    if (animate) {

        requestAnimationFrame(
            function () {

                reviewCard.style.transition =
                    "all 0.4s ease";


                reviewCard.style.opacity =
                    "1";


                reviewCard.style.transform =
                    "translateY(0)";

            }
        );

    }



    /* Delete button */

    const deleteButton =
        reviewCard.querySelector(
            ".delete-review"
        );


    deleteButton.addEventListener(
        "click",
        function () {

            deleteReview(
                review.id,
                reviewCard
            );

        }
    );

}



/* ========================================
   LOAD REVIEWS
======================================== */

function loadReviews() {

    savedReviews.forEach(
        function (review) {

            createReviewElement(
                review,
                false
            );

        }
    );


    updateReviewCount();

}



/* ========================================
   DELETE REVIEW
======================================== */

function deleteReview(
    id,
    element
) {

    element.style.opacity =
        "0";


    element.style.transform =
        "translateX(30px)";


    setTimeout(
        function () {

            savedReviews =
                savedReviews.filter(
                    function (review) {

                        return (
                            review.id !==
                            id
                        );

                    }
                );


            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    savedReviews
                )
            );


            element.remove();


            updateReviewCount();


            showMessage(
                "Review removed.",
                "#2563eb"
            );

        },
        300
    );

}



/* ========================================
   REVIEW COUNT
======================================== */

function updateReviewCount() {

    if (!reviewCount) {

        return;

    }


    const count =
        3 +
        savedReviews.length;


    reviewCount.textContent =
        count === 1
            ? "1 review"
            : `${count} reviews`;

}



/* ========================================
   MESSAGE
======================================== */

function showMessage(
    text,
    color
) {

    message.textContent =
        text;


    message.style.color =
        color;


    message.style.opacity =
        "1";


    clearTimeout(
        window.messageTimeout
    );


    window.messageTimeout =
        setTimeout(
            function () {

                message.style.opacity =
                    "0";

            },
            3000
        );

}



/* ========================================
   SHAKE FORM
======================================== */

function shakeForm() {

    const form =
        document.querySelector(
            ".review-form-section"
        );


    form.classList.add(
        "shake"
    );


    setTimeout(
        function () {

            form.classList.remove(
                "shake"
            );

        },
        500
    );

}



/* ========================================
   SECURITY
   Prevent HTML injection
======================================== */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}



/* ========================================
   START
======================================== */

displayVendor(
    getCurrentVendor()
);


renderFavoriteList();


loadReviews();