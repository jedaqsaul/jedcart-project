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

  let cart = [];
});

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
        //copy the article html and insert the appropriate product properties
        `
      <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="${product.title}"
              class="product-img"
            />
            <button class="bag-btn" data-id="1">
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>${product.price}</h4>
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
//Add to the cart
// to add to the cart we need to fetch products form the db.json- this is for a single a specific id
//each product will be added and saved in a cartItem.
//Every click is a single amount
//push a single cart item for every click
//finally we need to update the cart UI

function addToCart(id) {
  fetch(`https://localhost:3000/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      const cartItem = { ...product, amount: 1 };
      cart.push(cartItem);
      updateCartUI();
    });
}
