export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[
    {
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1
    },{
      productId:"bc2847e9-5323-403f-b7cf-57fde044a955",
      quantity:2
    },{
      productId:"aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
      quantity:3
    }
  ];
}

function savetoStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
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
  savetoStorage();

}
export function removeFromCart(productId){
 const newCart=[]
 cart.forEach((cartItem)=>{
  if(cartItem.productId!==productId){
    newCart.push(cartItem);
  }
 });
 cart=newCart;
 savetoStorage();
}