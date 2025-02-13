import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(category, ".product-list");
