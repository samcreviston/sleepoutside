// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramData = urlParams.get(param)

  return paramData
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
  if (clear) {
      parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
      callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
}

function getCartCount() {
  let cartCount = getLocalStorage("so-cart").length;
  return String(cartCount);
}

export function updateCartCount() {
  let currentCartCount = getCartCount();
  let countElement = document.getElementById("cart-count");
  countElement.innerHTML = currentCartCount;
}

export function loadHeaderFooter() {
  return new Promise((resolve, reject) => {
    try {
      // Get the header and footer contents
      const loadHeader = loadTemplate("/partials/header.html");
      const loadFooter = loadTemplate("/partials/footer.html");

      // Get the header and footer elements from the dom
      const headerElement = document.getElementById('main-header');
      const footerElement = document.getElementById('main-footer');

      // Render the header and footer
      Promise.all([
        renderWithTemplate(loadHeader, headerElement),
        renderWithTemplate(loadFooter, footerElement)
      ]).then(() => {
        // Now that the header is rendered, update the cart count
        updateCartCount();
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Function to render an error message on the page
export function renderErrorPage(message) {
  let mainElement = document.querySelector("main");

  // Clear the main content and replace it with a message and link back to the home page
  mainElement.innerHTML = `
      <div class="error-message">
          <h1>Oops!</h1>
          <p>${message}</p>
          <a href="/index.html">Return to Home</a>
      </div>
  `;
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}