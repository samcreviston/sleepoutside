const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  const resJson = res.json();
  console.log(resJson);

  if (res.ok) {
    return resJson;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(productId) {
  try {
      // Get the tents and check that the data exists
      const response = await fetch(baseURL + `product/${productId}`);
      if (!response.ok) {
          throw new Error("Failed to fetch product data");
      }

      // Get the products and make sure the product exists.
      const product = await convertToJson(response);
      if (!product) {
          return null;
      }

      // When there are no errors return the product
      return product.Result;
  } catch (error) {
      return null;
  }
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  const response = await fetch(baseURL + "checkout", options);
  if (!response.ok) {
    // You could log the response to inspect the error returned
    const errorResponse = await response.text(); // or response.json() if JSON is returned
    throw new Error(`Checkout failed: ${errorResponse}`);
  }
  return await convertToJson(response);
}

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

// make a request to the server for the current orders
// requires: a valid token
// returns: a list of orders
export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}