export const cart=[];
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