import { findProductById } from "./productData.mjs";
import { setLocalStorage, renderErrorPage, updateCartCount } from "./utils.mjs";

export default async function productDetails(productId) {
  try {
      const productData = await findProductById(productId);

      // If the product doesn't exist, render the error page
      if (!productData) {
        renderErrorPage("Looks like we don't have that product...");
      } else {
        // Otherwise load the product page normally
        renderProductDetails(productData);

        document.getElementById("addToCart").addEventListener("click", addToCartHandler);
      }
  } catch (error) {
      renderErrorPage(`An error occurred while loading the product: ${error}`);
  }
}

function renderProductDetails(item) {
  // Add content to the existing product_page index.html
    document.querySelector("#productName").innerHTML = item.Name;
    document.querySelector("#productNameWithoutBrand").textContent = item.NameWithoutBrand;
    document.querySelector("#productImage").setAttribute("src", item.Images.PrimaryLarge);
    document.querySelector("#productImage").setAttribute("alt", item.Name);
    renderDiscount(item.ListPrice, item.FinalPrice)
    document.querySelector("#productFinalPrice").textContent = `$${item.FinalPrice}`;
    document.querySelector("#productColorName").textContent = item.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = item.DescriptionHtmlSimple;
    document.querySelector("#addToCart").setAttribute("data-id", item.Id);
}

// Render and calculate the discount when applicable.
function renderDiscount(listPrice, finalPrice) {
  let listPriceElement = document.getElementById('productListPrice');

  // Reveal discount if there is one.
  if (listPrice >= finalPrice) {
    listPriceElement.style.display = "none";
  } else {
    listPriceElement.style.display = "block";
  
    // Calculate discount percentage
    const discountPercentage = Math.round(((listPrice - finalPrice) / listPrice) * 100);
  
    // Update the content with crossed-through list price and discount percentage
    listPriceElement.innerHTML = `
      <span id="listPrice">$${listPrice}</span>
      <span id="discountPercentage">(${discountPercentage}% off)</span>
    `;
  }  
}

// Add product to the cart
function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  // Ensure the cart is an array
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);

  updateCartCount();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}