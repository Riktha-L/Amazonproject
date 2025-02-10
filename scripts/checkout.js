import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartSummaryHTML = "";

// Use find instead of forEach for better product matching
cart.forEach((cartItem) => {
  const matchingProduct = products.find(
    (product) => product.id === cartItem.productId
  );
  // Skip if product not found
  if (!matchingProduct) {
    console.warn(`Product not found for ID: ${cartItem.productId}`);
    return;
  }

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: <span class="js-delivery-date-${matchingProduct.id}">Select a delivery option</span>
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">
        
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct) {
  let html = '';
  
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}`;
    
    html += `
      <div class="delivery-option">
        <input 
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-days="${option.deliveryDays}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
  });
  
  return html;
}

// Initialize the page
function initializePage() {
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  updateCheckoutQuantity();
  setupEventListeners();
}

function updateCheckoutQuantity() {
  const cartCheckoutQt = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.js-cart-quantity-checkout').innerHTML = cartCheckoutQt;
}

function setupEventListeners() {
  // Delete button listeners
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) {
        container.remove();
        updateCheckoutQuantity();
      }
    });
  });

  // Delivery option listeners
  document.querySelectorAll('.delivery-option-input').forEach((radio) => {
    radio.addEventListener('change', () => {
      const productId = radio.dataset.productId;
      const deliveryDays = parseInt(radio.dataset.deliveryDays);
      const deliveryDate = dayjs().add(deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      document.querySelector(`.js-delivery-date-${productId}`).textContent = dateString;
    });
  });
}

// Start the page initialization
initializePage();