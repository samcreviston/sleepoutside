function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(productId) {
  try {
      // Get the tents and check that the data exists
      const response = await fetch("/json/tents.json");
      if (!response.ok) {
          throw new Error("Failed to fetch product data");
      }

      // Get the products and make sure the product exists.
      const products = await response.json();
      const product = products.find(p => p.Id === productId);
      if (!product) {
          return null;
      }

      // When there are no errors return the product
      return product;
  } catch (error) {
      return null;
  }
}
