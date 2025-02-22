import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
// Get the category from the url. The default state is tents.
const category = getParam("category") || "tents";
productList(category, ".product-list");
