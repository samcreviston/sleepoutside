import { getData } from "./productData.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img
            src="${product.Image}"
            alt="${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.FinalPrice}</p></a
        >
        </li>`
}

function renderList(list, selector) {
    const prodContainer = document.querySelector(selector);
    prodContainer.innerHTML = " ";

    list.forEach(product => {
        const productCard = productCardTemplate(product);
        prodContainer.innerHTML += productCard;
    });
}

//dynamically display the producst by category
export default async function productList(category, selector) {
    const products = await getData(category);
    await renderList(products, selector);
}