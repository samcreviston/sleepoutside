import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  try {
    const cartItems = getLocalStorage("so-cart");

    // Check if the cart is empty
    if (!cartItems || cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    // Render the cart items if they exist
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } catch (error) {
    console.error("Error rendering cart contents:", error);
    document.querySelector(".product-list").innerHTML = "<p>There was an error loading your cart.</p>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
