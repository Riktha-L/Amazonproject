export const cart=[
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1
  }
];
export function addtocart(productId, selectedQuantity){
  let matchingItem = null;

  cart.forEach((cartItem) => {
    // Check if this product is already in the cart:
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity
    });
  }

 
}