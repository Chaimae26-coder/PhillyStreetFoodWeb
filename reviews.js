/* ========================================
   REVIEWS SYSTEM
======================================== */


/* ========================================
   ELEMENTS
======================================== */

const submitButton =
    document.getElementById("submitReviewButton");

const nameInput =
    document.getElementById("reviewName");

const ratingInput =
    document.getElementById("reviewRating");

const textInput =
    document.getElementById("reviewText");

const reviewsList =
    document.getElementById("reviewsList");

const message =
    document.getElementById("reviewMessage");

const reviewCount =
    document.getElementById("reviewCount");


/* ========================================
   STORAGE
======================================== */

const STORAGE_KEY = "phillyStreetFoodReviews";


/* ========================================
   LOAD SAVED REVIEWS
======================================== */

let savedReviews =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];


/* ========================================
   CHARACTER COUNTER
======================================== */

const characterCounter =
    document.getElementById("characterCount");


if (characterCounter) {

    textInput.addEventListener("input", function () {

        const length =
            textInput.value.length;

        characterCounter.textContent =
            length;

    });

}


/* ========================================
   STAR DISPLAY
======================================== */

ratingInput.addEventListener(
    "change",
    function () {

        const rating =
            Number(ratingInput.value);

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

        if (name.length < 2) {

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

        if (reviewText.length < 5) {

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

        submitButton.disabled = true;

        submitButton.innerHTML =
            "⏳ Posting Review...";


        /* ------------------------------
           CREATE REVIEW
        ------------------------------ */

        setTimeout(function () {

            const review = {

                id: Date.now(),

                name: name,

                rating:
                    Number(rating),

                text: reviewText,

                date:
                    new Date().toLocaleDateString()

            };


            /* Save */

            savedReviews.unshift(review);


            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(savedReviews)
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

            nameInput.value = "";

            ratingInput.value = "";

            textInput.value = "";


            if (characterCounter) {
                characterCounter.textContent = "0";
            }


            /* Reset button */

            submitButton.disabled = false;

            submitButton.innerHTML =
                "Submit Review →";


        }, 700);

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
        document.createElement("div");


    reviewCard.classList.add(
        "review-card"
    );


    if (animate) {

        reviewCard.style.opacity = "0";

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
        "⭐".repeat(review.rating);


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
                        ${review.date}
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
            data-id="${review.id}">
            Remove
        </button>

    `;


    /* Put newest review first */

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

    element.style.opacity = "0";

    element.style.transform =
        "translateX(30px)";


    setTimeout(function () {

        savedReviews =
            savedReviews.filter(
                function (review) {

                    return review.id !== id;

                }
            );


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(savedReviews)
        );


        element.remove();

        updateReviewCount();


        showMessage(
            "Review removed.",
            "#2563eb"
        );


    }, 300);

}


/* ========================================
   REVIEW COUNT
======================================== */

function updateReviewCount() {

    if (!reviewCount) {
        return;
    }


    const count =
        3 + savedReviews.length;


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
        setTimeout(function () {

            message.style.opacity =
                "0";

        }, 3000);

}


/* ========================================
   SHAKE FORM
======================================== */

function shakeForm() {

    const form =
        document.querySelector(
            ".review-form"
        );


    form.classList.add(
        "shake"
    );


    setTimeout(function () {

        form.classList.remove(
            "shake"
        );

    }, 500);

}


/* ========================================
   SECURITY
   Prevent HTML injection
======================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* ========================================
   START
======================================== */

loadReviews();
