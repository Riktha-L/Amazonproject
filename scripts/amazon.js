import{cart} from '../data/cart.js';
let productsHTML=''; // Start with an empty string to store all product HTML.

products.forEach((product) => {  // For each product in the products array:
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
        $${(product.priceCents / 100).toFixed(2)}
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

//console.log(productsHTML);
// Put all the product HTML into the page inside the grid.
document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{ // Find all "Add to Cart" buttons.
  button.addEventListener('click',()=>{ // When a button is clicked:
    const productId=button.dataset.productId; // Get the ID of the product from the button.
    const productContainer = button.closest('.product-container');
    const quantitySelect = productContainer.querySelector('select');
    const selectedQuantity = parseInt(quantitySelect.value, 10); 
    let matchingItem=cart.find((item)=>item.productId==productId); // A place to store the matching product in the cart.

    cart.forEach((item)=>{// Check if this product is already in the cart:
      if(productId===item.productId){
        matchingItem = item;
      }
    });
    if(matchingItem){
      matchingItem.quantity += selectedQuantity;
    }else{
    cart.push({
      productId: productId,
      quantity: selectedQuantity
    });
  }
  let cartquantity=0;
  cart.forEach((item)=>{
    cartquantity += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
 // console.log(cartquantity);
  // console.log(cart);
  });
});