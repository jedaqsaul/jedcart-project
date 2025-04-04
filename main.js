//Load Dom and select all elements
document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products-center");
  const cartContent = document.querySelector(".cart-content");
  const cartTotal = document.querySelector(".cart-total");
  const cartItems = document.querySelector(".cart-items");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartDOM = document.querySelector(".cart");
  const cartBtn = document.querySelector(".cart-btn");
  const closeCartBtn = document.querySelector(".close-cart");
  const clearCartBtn = document.querySelector(".clear-cart");

  let cart = [];
  console.log(cart);

  //fetch prouducts from db.json

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      //call the function to display products
      displayProducts(products);
    } catch (error) {
      console.error(error);
    }
  }
  //create function to display products

  function displayProducts(products) {
    productsContainer.innerHTML = products
      .map(
        (product) =>
          `
      <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${product.name}</h3>
          <h4>KES ${product.price}</h4>  <!-- Changed to show KES -->
        </article>
    `
      )
      .join("");

    document.querySelectorAll(".bag-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        let productId = event.target.dataset.id;
        addToCart(productId);
      });
    });
  }

  function updateCartUI() {
    cartContent.innerHTML = cart
      .map(
        (item) => `
    <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <h4>${item.name}</h4>
              <h5>KES ${item.price}</h5>  <!-- Changed to show KES -->
              <span class="remove-item" data-id="${item.id}">remove</span>
            </div>
            <div>
              <p class="item-amount" data-id="${item.id}">${item.amount}</p>
            </div>
          </div>
    `
      )
      .join("");

    cartItems.textContent = cart.reduce(
      (total, item) => total + item.amount,
      0
    );

    // Display total price in KES
    cartTotal.textContent = `KES ${cart.reduce(
      (total, item) => total + item.price * item.amount,
      0
    )}`;
  }

  //Add to the cart
  // to add to the cart we need to fetch products form the db.json- this is for a single a specific id
  //each product will be added and saved in a cartItem.
  //Every click is a single amount
  //push a single cart item for every click
  //finally we need to update the cart UI

  function addToCart(id) {
    const existingItem = cart.find((item) => item.id == id);
    if (existingItem) {
      existingItem.amount += 1; // Instead of duplicating, just increase the amount
    } else {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((product) => {
          const cartItem = { ...product, amount: 1 };
          cart.push(cartItem);
          updateCartUI();
        });
      return;
    }
    updateCartUI();
  }

  //Let us try to update the cart UI
  //get the cartITEM html and generate it with javascript
  //add a data attribute with an id to uniquely identify the item being updated on the UI

  function updateCartUI() {
    // loop through the cart array
    //use .map to turn each item into an HTML string
    //Each item has an image, h4, h5 a span and an increase and decrease quantity  tag
    //use .join to ensure items are added without extra commas
    cartContent.innerHTML = cart
      .map(
        (item) => `
    <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <h4>${item.name}</h4>
              <h5>${item.price}</h5>
              <span class="remove-item" data-id="${item.id}">remove</span>
            </div>
            <div>
              
              <p class="item-amount" data-id="${item.id}">${item.amount}</p>

              
            </div>
          </div>
    `
      )
      .join("");

    //call function to remove the clicked item
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        removeItem(event.target.dataset.id);
      });
    });
    //update the cart Item count
    cartItems.textContent = cart.reduce(
      (total, item) => total + item.amount,
      0
    );
    // calculate and update the total cart price=>>
    cartTotal.textContent = cart.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  }

  //add clear-cart functionality

  //remove items from the cart
  // to remove items from the cart we need to implement .filter
  //We filter out an item and update the cartUI
  //the function takes in the product's id as a parameter

  //At this point the cart is still hidden from the screen
  //I need to implement a class that will enable the cart
  function removeItem(id) {
    cart = cart.filter((item) => item.id !== id); // Ensure only the selected item is removed
    updateCartUI();
  }

  function clearCart() {
    cart = [];
    updateCartUI();
  }

  function toogleCart() {
    cartOverlay.classList.toggle("transparentBcg");
    cartDOM.classList.toggle("show-cart");
  }
  //let us now add event listener to the cartBtn and the closeCartBtn

  cartBtn.addEventListener("click", toogleCart);
  closeCartBtn.addEventListener("click", toogleCart);
  clearCartBtn.addEventListener("click", clearCart);
  //RUn fetch products and load everything when the page first loads
  fetchProducts();
});

//Remainign issues

// similar products appear on the cart more than once
//clear cart button clears the cart

// duplicate items in the cart
//local storage
