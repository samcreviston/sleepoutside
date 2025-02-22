import { getLocalStorage } from "./utils.mjs";
import { removeCartItem } from "./cartUtils.mjs";

// Function to render cart contents
export function renderCartContents() {
  try {
    const cartItems = getLocalStorage("so-cart");

    // Check if the cart is empty
    if (!cartItems || cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML =
        "<p>Your cart is empty.</p>";
      renderCartTotal();
      return;
    }

    // Render the cart items if they exist
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Render the cart total
    renderCartTotal();
  } catch (error) {
    document.querySelector(".product-list").innerHTML =
      "<p>There was an error loading your cart.</p>";
  }
}

// Function to create cart item HTML
export function cartItemTemplate(item) {
  return `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-card__remove">X</button>
  </li>
  `;
}

// Function to render cart total
export function renderCartTotal() {
  const cartTotaldiv = document.querySelector(".cart-footer");
  const cartTotalP = document.querySelector(".cart-total");
  const cartItems = getLocalStorage("so-cart");

  let total = 0;
  if (!cartItems || cartItems.length === 0) {
    cartTotaldiv.style.display = "none";
  } else {
    cartTotaldiv.style.display = "block";
    total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
  }

  cartTotalP.innerHTML = "Total: $" + total;
}

// Event listener for removing items
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("cart-card__remove")) {
    const cartItem = event.target.closest("li");
    const itemName = cartItem.querySelector(".card__name").textContent.trim();
    
    removeCartItem(itemName);
  }
});