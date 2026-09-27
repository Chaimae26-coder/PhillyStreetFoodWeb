const menus = {

    "Taco El Barrio": {
        icon: "🌮",
        description: "Street-style Mexican food",
        items: [
            {
                name: "Street Tacos",
                description: "Three tacos with your choice of chicken or beef.",
                price: 10.99
            },
            {
                name: "Chicken Quesadilla",
                description: "Grilled tortilla with chicken, cheese, and salsa.",
                price: 9.99
            },
            {
                name: "Loaded Nachos",
                description: "Crispy chips with cheese, beans, salsa, and toppings.",
                price: 8.99
            },
            {
                name: "Mexican Rice Bowl",
                description: "Rice, beans, vegetables, salsa, and your choice of protein.",
                price: 11.99
            },
            {
                name: "Churros",
                description: "Warm cinnamon-sugar churros.",
                price: 5.49
            }
        ]
    },


    "Halal Cart Philly": {
        icon: "🍗",
        description: "Chicken, lamb, rice, and fresh street-food plates",
        items: [
            {
                name: "Chicken Over Rice",
                description: "Seasoned chicken over yellow rice with salad and sauce.",
                price: 11.99
            },
            {
                name: "Lamb Over Rice",
                description: "Tender seasoned lamb over yellow rice with salad and sauce.",
                price: 12.99
            },
            {
                name: "Chicken & Lamb Combo",
                description: "Chicken and lamb served over rice with fresh salad.",
                price: 13.99
            },
            {
                name: "Falafel Plate",
                description: "Crispy falafel with rice, salad, and tahini.",
                price: 10.49
            },
            {
                name: "Baklava",
                description: "Sweet flaky pastry with nuts and honey.",
                price: 4.49
            }
        ]
    },


    "Philly Fresh Grill": {
        icon: "🍔",
        description: "Fresh grilled sandwiches and loaded fries",
        items: [
            {
                name: "Classic Cheesesteak",
                description: "Thin-sliced steak with melted cheese on a fresh roll.",
                price: 12.99
            },
            {
                name: "Chicken Cheesesteak",
                description: "Grilled chicken with melted cheese and peppers.",
                price: 11.99
            },
            {
                name: "Loaded Fries",
                description: "Crispy fries topped with cheese and grilled toppings.",
                price: 7.99
            },
            {
                name: "Grilled Chicken Sandwich",
                description: "Grilled chicken, lettuce, tomato, and house sauce.",
                price: 10.99
            },
            {
                name: "Fresh Lemonade",
                description: "Cold freshly squeezed lemonade.",
                price: 3.49
            }
        ]
    },


    "Sweet Treats Truck": {
        icon: "🧁",
        description: "Ice cream, cookies, and Philly-inspired desserts",
        items: [
            {
                name: "Chocolate Chip Cookie",
                description: "Warm soft-baked chocolate chip cookie.",
                price: 3.49
            },
            {
                name: "Brownie",
                description: "Rich chocolate brownie.",
                price: 4.49
            },
            {
                name: "Ice Cream Cup",
                description: "Two scoops of your favorite flavor.",
                price: 5.99
            },
            {
                name: "Strawberry Shortcake",
                description: "Fresh strawberries, cake, and whipped cream.",
                price: 6.99
            },
            {
                name: "Philly Cheesecake",
                description: "Creamy cheesecake with a graham cracker crust.",
                price: 6.49
            }
        ]
    },


    "South Street Slices": {
        icon: "🍕",
        description: "Quick slices and classic pizza",
        items: [
            {
                name: "Classic Cheese Slice",
                description: "Classic cheese pizza.",
                price: 3.99
            },
            {
                name: "Pepperoni Slice",
                description: "Cheese pizza topped with pepperoni.",
                price: 4.99
            },
            {
                name: "Veggie Slice",
                description: "Pizza topped with fresh vegetables.",
                price: 4.99
            },
            {
                name: "Garlic Knots",
                description: "Warm garlic knots with parmesan.",
                price: 5.49
            },
            {
                name: "Two Slice Combo",
                description: "Two slices with a fountain drink.",
                price: 9.99
            }
        ]
    },


    "Philly Rice Bowl": {
        icon: "🍚",
        description: "Rice bowls with vegetables, chicken, and tofu",
        items: [
            {
                name: "Teriyaki Chicken Bowl",
                description: "Chicken, rice, vegetables, and teriyaki sauce.",
                price: 11.99
            },
            {
                name: "Tofu Rice Bowl",
                description: "Crispy tofu, vegetables, and rice.",
                price: 10.99
            },
            {
                name: "Korean BBQ Bowl",
                description: "Korean-style beef with rice and vegetables.",
                price: 12.99
            },
            {
                name: "Vegetable Bowl",
                description: "Fresh seasonal vegetables over steamed rice.",
                price: 9.99
            },
            {
                name: "Mango Green Tea",
                description: "Refreshing mango green tea.",
                price: 3.99
            }
        ]
    }

};


// ========================================
// SELECT VENDOR
// ========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const selectedVendor =
    params.get("vendor");


const vendorName =
    menus[selectedVendor]
        ? selectedVendor
        : "Taco El Barrio";


const vendor =
    menus[vendorName];


// ========================================
// CART
// ========================================

let cart = [];


// ========================================
// ELEMENTS
// ========================================

const vendorNameElement =
    document.getElementById("vendorName");

const vendorDescription =
    document.getElementById("vendorDescription");

const vendorIcon =
    document.getElementById("vendorIcon");

const menuItems =
    document.getElementById("menuItems");

const cartElement =
    document.getElementById("cart");

const totalElement =
    document.getElementById("total");

const itemCount =
    document.getElementById("itemCount");

const pickupTime =
    document.getElementById("pickupTime");

const message =
    document.getElementById("message");

const placeOrderButton =
    document.getElementById("placeOrderButton");

const vendorSelect =
    document.getElementById("vendorSelect");

const confirmation =
    document.getElementById("confirmation");


// ========================================
// VENDOR HEADER
// ========================================

vendorNameElement.textContent =
    vendorName;

vendorDescription.textContent =
    vendor.description;

vendorIcon.textContent =
    vendor.icon;


// ========================================
// VENDOR SWITCHER
// ========================================

Object.keys(menus).forEach(function (name) {

    const option =
        document.createElement("option");

    option.value = name;

    option.textContent = name;

    option.selected = name === vendorName;

    vendorSelect.appendChild(option);

});


vendorSelect.addEventListener(
    "change",
    function () {

        window.location.href =
            "order.html?vendor=" +
            encodeURIComponent(vendorSelect.value);

    }
);


// ========================================
// DISPLAY MENU
// ========================================

function displayMenu() {

    menuItems.innerHTML = "";


    vendor.items.forEach(function (item, index) {

        const card =
            document.createElement("article");

        card.className = "menu-card";


        card.innerHTML = `

            <div class="menu-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.description}
                </p>

                <span class="menu-item-price">
                    $${item.price.toFixed(2)}
                </span>

            </div>


            <button
                class="add-button"
                data-index="${index}"
                type="button"
            >
                Add +
            </button>

        `;


        menuItems.appendChild(card);

    });


    document.querySelectorAll(
        ".add-button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );


                addToCart(
                    vendor.items[index]
                );


                button.textContent =
                    "Added ✓";

                button.classList.add(
                    "added"
                );


                setTimeout(function () {

                    button.textContent =
                        "Add +";

                    button.classList.remove(
                        "added"
                    );

                }, 700);

            }
        );

    });

}


// ========================================
// ADD TO CART
// ========================================

function addToCart(item) {

    const existing =
        cart.find(function (cartItem) {

            return cartItem.name === item.name;

        });


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            name: item.name,

            price: item.price,

            quantity: 1

        });

    }


    updateCart();

}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    cartElement.innerHTML = "";


    if (cart.length === 0) {

        cartElement.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
                <br>
                Add something delicious!
            </p>

        `;

    } else {

        cart.forEach(function (item, index) {

            const row =
                document.createElement("div");

            row.className = "cart-item";


            row.innerHTML = `

                <div>

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        $${item.price.toFixed(2)}
                    </div>


                    <div class="quantity-controls">

                        <button
                            class="quantity-button"
                            data-index="${index}"
                            data-change="-1"
                            type="button"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-button"
                            data-index="${index}"
                            data-change="1"
                            type="button"
                        >
                            +
                        </button>

                    </div>

                </div>


                <strong>
                    $${(
                        item.price *
                        item.quantity
                    ).toFixed(2)}
                </strong>

            `;


            cartElement.appendChild(row);

        });


        document.querySelectorAll(
            ".quantity-button"
        ).forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const change =
                        Number(
                            button.dataset.change
                        );


                    cart[index].quantity +=
                        change;


                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    updateCart();

                }
            );

        });

    }


    updateTotal();

}


// ========================================
// TOTAL
// ========================================

function updateTotal() {

    let total = 0;

    let count = 0;


    cart.forEach(function (item) {

        total +=
            item.price *
            item.quantity;

        count +=
            item.quantity;

    });


    totalElement.textContent =
        "$" +
        total.toFixed(2);


    itemCount.textContent =
        count +
        (count === 1 ? " item" : " items");

}


// ========================================
// PLACE ORDER
// ========================================

placeOrderButton.addEventListener(
    "click",
    function () {

        message.textContent = "";


        if (cart.length === 0) {

            message.textContent =
                "Please add at least one item.";

            return;

        }


        if (!pickupTime.value) {

            message.textContent =
                "Please choose a pickup time.";

            return;

        }


        const total =
            cart.reduce(
                function (sum, item) {

                    return sum +
                        item.price *
                        item.quantity;

                },
                0
            );


        document.getElementById(
            "confirmedVendor"
        ).textContent =
            vendorName;


        document.getElementById(
            "confirmedPickup"
        ).textContent =
            pickupTime.value;


        document.getElementById(
            "confirmedTotal"
        ).textContent =
            "$" +
            total.toFixed(2);


        confirmation.classList.remove(
            "hidden"
        );


        document.querySelector(
            ".order-layout"
        ).style.display =
            "none";


        document.querySelector(
            ".order-hero"
        ).style.display =
            "none";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ========================================
// START
// ========================================

displayMenu();

updateCart();