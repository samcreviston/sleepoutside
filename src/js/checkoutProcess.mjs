import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }
  
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
        };
    });
return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key) {
        this.key = key;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
    calculateItemSummary: function() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        // Get elements
        let totalElement = document.getElementById("subtotal-cost");
        let itemCountElement = document.getElementById("item-count");
        const list = this.list;
        let subTotal = 0;
        let countTotal = 0;
        list.forEach(item => {
            countTotal++;
            subTotal += item.FinalPrice
        })

        // Store total
        this.itemTotal = subTotal;

        // Set elements
        totalElement.innerText = `$${subTotal}`;
        itemCountElement.textContent = countTotal;
    },
    calculateOrdertotal: function() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        let subTotal = this.itemTotal;
        let tax = subTotal * .06;
        let shipping = 10 + 2 * (this.list.length - 1);

        // Set object variables
        this.tax = tax;
        this.shipping = shipping;

        let total = subTotal + tax + shipping;
        this.orderTotal = total;


        // display the totals.
        this.displayOrderTotals();
    },
    displayOrderTotals: function() {
        // once the totals are all calculated display them in the order summary page

        // Update shipping element
        let shippingElement = document.getElementById("shipping-cost");
        shippingElement.innerText = `$${this.shipping}`;
        
        // Update tax element
        let taxElement = document.getElementById("tax-cost");
        taxElement.innerText = `$${this.tax.toFixed(2)}`;

        // Update order total
        let totalElement = document.getElementById("total-cost");
        totalElement.innerText = `$${this.orderTotal.toFixed(2)}`
    },
    checkout: async function (form) {
        const json = formDataToJSON(form);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await checkout(json);
          console.log(res);

          //go to the success page
          window.location.href = "/checkout/success.html";

          //clear cart

          setLocalStorage("so-cart", []);

        } catch (err) {
          console.log(err);
        }
    },
}

export default checkoutProcess;