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
console.log(fetchProducts());
