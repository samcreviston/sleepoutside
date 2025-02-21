import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import { renderCartContents } from "./cartView.mjs";

// Function to remove an item from localStorage and re-render the cart
export function removeCartItem(itemName) {
  let cartItems = getLocalStorage("so-cart");

  if (!cartItems) return;

  // Filter out the item to be removed
  cartItems = cartItems.filter((item) => item.Name !== itemName);

  // Update localStorage
  setLocalStorage("so-cart", cartItems);

  //update cart count icon
  updateCartCount();

  // Re-render the cart to reflect changes
  renderCartContents();
}

