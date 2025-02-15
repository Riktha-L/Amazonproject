import { cart, addtocart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// Define renderProducts function first
function renderProducts(productsToRender) {
  let productsHTML = '';

  productsToRender.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>
        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="product-spacer"></div>
        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // Reattach event listeners after rendering
  attachAddToCartListeners();
}

function updatecartquantity() {
  let cartquantity = 0;
  cart.forEach((cartItem) => {
    cartquantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
}

function attachAddToCartListeners() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productContainer = button.closest('.product-container');
      const quantitySelect = productContainer.querySelector('select');
      const selectedQuantity = parseInt(quantitySelect.value, 10);

      addtocart(productId, selectedQuantity);
      updatecartquantity();
    });
  });
}

// Search functionality
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

function searchProducts(searchText) {
  searchText = searchText.toLowerCase();
  
  const filteredProducts = products.filter((product) => {
    // Search in product name
    if (product.name.toLowerCase().includes(searchText)) {
      return true;
    }
    
    // Search in keywords
    return product.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchText)
    );
  });
  
  renderProducts(filteredProducts);
}

// Search on button click
searchButton.addEventListener('click', () => {
  searchProducts(searchBar.value);
});

// Search on Enter key press
searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchProducts(searchBar.value);
  }
});

// Initial render of all products
renderProducts(products);