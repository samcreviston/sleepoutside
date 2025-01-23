import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

export default async function productDetails(productId) {
    const productData = await findProductById(productId);
    console.log(productData)
    renderProductDetails(productData);

    // add listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}

function renderProductDetails(productObject) {
    console.log(productObject.Name)
    document.querySelector("#productName").innerHTML = productObject.Name
    document.querySelector("#productNameWithoutBrand").textContent = productObject.NameWithoutBrand
    document.querySelector("#productImage").setAttribute("src", productObject.Image)
    document.querySelector("#productImage").setAttribute("alt", productObject.Name)
    document.querySelector("#productFinalPrice").textContent = productObject.FinalPrice
    document.querySelector("#productColorName").textContent = productObject.Colors[0].ColorName
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = productObject.DescriptionHtmlSimple
    document.querySelector("#addToCart").setAttribute("data-id", productObject.Id)
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
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}