// ========================================
// ORDER SYSTEM
// ========================================

let cart = [];


// ========================================
// DOM ELEMENTS
// ========================================

const addButtons = document.querySelectorAll(".add-button");

const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");

const pickupTime = document.getElementById("pickupTime");
const placeOrderButton =
    document.getElementById("placeOrderButton");

const message = document.getElementById("message");

const confirmation =
    document.getElementById("confirmation");

const confirmedPickup =
    document.getElementById("confirmedPickup");

const confirmedTotal =
    document.getElementById("confirmedTotal");


// ========================================
// ADD BUTTONS
// ========================================

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        addToCart(name, price);

        // Button animation
        button.classList.add("added");

        const originalText = button.textContent;

        button.textContent = "✓ Added";

        setTimeout(function () {

            button.classList.remove("added");

            button.textContent = originalText;

        }, 800);

    });

});


// ========================================
// ADD TO CART
// ========================================

function addToCart(name, price) {

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            quantity: 1
        });

    }


    displayCart();

    showMessage(`${name} added to your order!`, "success");

}


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    cartContainer.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>

                <p>Your order is empty.</p>

                <small>
                    Add something delicious!
                </small>
            </div>
        `;

        updateTotal();

        updateItemCount();

        return;
    }


    // Create items
    cart.forEach(function (item, index) {

        const itemDiv =
            document.createElement("div");

        itemDiv.classList.add("cart-item");

        itemDiv.dataset.id = item.id;


        itemDiv.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    $${item.price.toFixed(2)}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    class="quantity-button decrease"
                    data-index="${index}"
                    aria-label="Decrease quantity">
                    −
                </button>

                <span class="quantity">
                    ${item.quantity}
                </span>

                <button
                    class="quantity-button increase"
                    data-index="${index}"
                    aria-label="Increase quantity">
                    +
                </button>

            </div>

        `;


        cartContainer.appendChild(itemDiv);


        // Small entrance animation
        setTimeout(function () {

            itemDiv.classList.add("visible");

        }, 20);

    });


    attachQuantityEvents();

    updateTotal();

    updateItemCount();

}


// ========================================
// QUANTITY EVENTS
// ========================================

function attachQuantityEvents() {

    const buttons =
        document.querySelectorAll(".quantity-button");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);


            const amount =
                button.classList.contains("increase")
                    ? 1
                    : -1;


            changeQuantity(index, amount);

        });

    });

}


// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity += amount;


    // Remove item
    if (cart[index].quantity <= 0) {

        const removedName = cart[index].name;

        cart.splice(index, 1);

        showMessage(
            `${removedName} removed from your order.`,
            "info"
        );

    }


    displayCart();

}


// ========================================
// CALCULATE TOTAL
// ========================================

function calculateTotal() {

    return cart.reduce(function (total, item) {

        return total +
            item.price * item.quantity;

    }, 0);

}


// ========================================
// TOTAL
// ========================================

function updateTotal() {

    const total = calculateTotal();

    animatePrice(total);

}


// ========================================
// ANIMATED PRICE
// ========================================

function animatePrice(newTotal) {

    const oldText =
        totalElement.textContent
            .replace("$", "");

    const oldTotal =
        Number(oldText) || 0;


    const duration = 300;

    const startTime = performance.now();


    function animate(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );


        const value =
            oldTotal +
            (newTotal - oldTotal) * progress;


        totalElement.textContent =
            "$" + value.toFixed(2);


        if (progress < 1) {

            requestAnimationFrame(animate);

        }

    }


    requestAnimationFrame(animate);

}


// ========================================
// ITEM COUNT
// ========================================

function updateItemCount() {

    const itemCount =
        cart.reduce(function (total, item) {

            return total + item.quantity;

        }, 0);


    const countElement =
        document.querySelector(".section-heading span");


    if (!countElement) {
        return;
    }


    countElement.textContent =
        itemCount === 1
            ? "1 item"
            : `${itemCount} items`;

}


// ========================================
// PICKUP TIME
// ========================================

pickupTime.addEventListener("change", function () {

    if (pickupTime.value === "") {
        return;
    }


    showMessage(
        `Pickup time selected: ${pickupTime.value}`,
        "success"
    );


    pickupTime.classList.add("selected");


    setTimeout(function () {

        pickupTime.classList.remove("selected");

    }, 500);

});


// ========================================
// PLACE ORDER
// ========================================

placeOrderButton.addEventListener(
    "click",
    function () {

        // No items
        if (cart.length === 0) {

            showMessage(
                "Please add at least one item to your order.",
                "error"
            );

            shakeElement(cartContainer);

            return;
        }


        // No pickup time
        if (pickupTime.value === "") {

            showMessage(
                "Please choose a pickup time.",
                "error"
            );

            shakeElement(pickupTime);

            pickupTime.focus();

            return;
        }


        // Loading state
        placeOrderButton.disabled = true;

        placeOrderButton.innerHTML = `
            <span class="spinner"></span>
            Processing...
        `;


        // Simulate order processing
        setTimeout(function () {

            completeOrder();

        }, 900);

    }
);


// ========================================
// COMPLETE ORDER
// ========================================

function completeOrder() {

    const total =
        calculateTotal();


    confirmedPickup.textContent =
        pickupTime.value;


    confirmedTotal.textContent =
        "$" + total.toFixed(2);


    // Hide order sections
    const orderSection =
        document.querySelector(".order-section");

    const pickupSection =
        document.querySelector(".pickup-section");


    if (orderSection) {

        orderSection.classList.add("hidden");

    }


    if (pickupSection) {

        pickupSection.classList.add("hidden");

    }


    placeOrderButton.classList.add("hidden");

    message.classList.add("hidden");


    // Show confirmation
    confirmation.classList.remove("hidden");


    // Scroll
    confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    // Celebration
    createConfetti();

}


// ========================================
// MESSAGES
// ========================================

function showMessage(text, type) {

    message.textContent = text;

    message.className = "";

    message.classList.add(`message-${type}`);


    clearTimeout(window.messageTimer);


    window.messageTimer =
        setTimeout(function () {

            message.textContent = "";

            message.className = "";

        }, 2500);

}


// ========================================
// SHAKE ANIMATION
// ========================================

function shakeElement(element) {

    element.classList.add("shake");


    setTimeout(function () {

        element.classList.remove("shake");

    }, 500);

}


// ========================================
// CONFETTI
// ========================================

function createConfetti() {

    const colors = [
        "#ef4444",
        "#f97316",
        "#facc15",
        "#22c55e",
        "#3b82f6"
    ];


    for (let i = 0; i < 60; i++) {

        const piece =
            document.createElement("div");


        piece.classList.add("confetti");


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        piece.style.animationDelay =
            Math.random() * 0.5 + "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        document.body.appendChild(piece);


        setTimeout(function () {

            piece.remove();

        }, 3000);

    }

}


// ========================================
// INITIAL DISPLAY
// ========================================

displayCart();