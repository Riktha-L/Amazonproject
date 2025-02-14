// Import necessary modules
import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Get orders from localStorage or initialize empty array
function getOrders() {
  const savedOrders = localStorage.getItem('orders');
  return savedOrders ? JSON.parse(savedOrders) : [];
}

// Save orders to localStorage
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Add a new order
export function addOrder(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const orders = getOrders();
  
  const newOrder = {
    orderId: generateOrderId(),
    orderDate: dayjs().format('YYYY-MM-DD'),
    total: product.priceCents * quantity,
    items: [{
      productId: productId,
      quantity: quantity,
      deliveryDate: dayjs().add(5, 'days').format('YYYY-MM-DD') // Example: 5 days delivery
    }]
  };

  orders.push(newOrder);
  saveOrders(orders);
}

// Generate a unique order ID
function generateOrderId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateOrderHTML(order) {
  const orderDate = dayjs(order.orderDate).format('MMMM D');
  
  let orderItemsHTML = '';
  order.items.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return;

    orderItemsHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(item.deliveryDate).format('MMMM D')}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        <button class="buy-again-button button-primary" data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.total)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.orderId}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${orderItemsHTML}
      </div>
    </div>
  `;
}

function generateOrdersPage() {
  const orders = getOrders();
  
  if (orders.length === 0) {
    document.querySelector('.orders-grid').innerHTML = `
      <div class="no-orders-message">
        No orders found. Start shopping to see your orders here!
      </div>
    `;
    return;
  }

  let ordersHTML = '';
  // Sort orders by date (most recent first)
  orders.sort((a, b) => dayjs(b.orderDate).unix() - dayjs(a.orderDate).unix());
  
  orders.forEach(order => {
    ordersHTML += generateOrderHTML(order);
  });
  
  document.querySelector('.orders-grid').innerHTML = ordersHTML;
}

// Function to add item to cart when "Buy it again" is clicked
function buyAgain(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);
  
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }

  cart.push({
    productId: productId,
    quantity: quantity
  });

  updateCartQuantity();
}

// Function to update cart quantity in the header
function updateCartQuantity() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-quantity').innerHTML = totalQuantity;
}

// Add click event listeners to all "Buy it again" buttons
function setupBuyAgainButtons() {
  document.querySelectorAll('.buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const orderContainer = button.closest('.order-details-grid');
      const quantity = parseInt(orderContainer.querySelector('.product-quantity').textContent.match(/\d+/)[0]);
      
      buyAgain(productId, quantity);
     // alert('Item added to cart!');
    });
  });
}

// Initialize the page
function initializePage() {
  generateOrdersPage();
  setupBuyAgainButtons();
  updateCartQuantity();
}

// Start the page initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
console.log(JSON.parse(localStorage.getItem('orders')));