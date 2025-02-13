const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
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
