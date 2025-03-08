import { loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

// Load the header and footer onto the page.
loadHeaderFooter();

// Check for a url parameter called redirect (remember the utility function: getParam?)
const redirect = getParam("redirect");

// Add an event listener to our login form's button, when the login button is clicked do the following:
const loginElement = document.getElementById("login-button");

loginElement.addEventListener("click", async () => {
    // Get the email and password out of the form fields.
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Pass those to the login function along with the redirect information we gathered above.
    login({email, password}, redirect);
});