const cart={
  cartItems:undefined,
  loadfromStorage:function(){
    cart.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
  if(!cart.cartItems){
    cart.cartItems=[
      {
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
      },{
        productId:"bc2847e9-5323-403f-b7cf-57fde044a955",
        quantity:1,
        deliveryOptionId:"2"
      }
    ];
  }
  },
  savetoStorage(){
    localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
  },
  addtocart(productId, selectedQuantity){
    let matchingItem = null;
  
    this.cartItems.forEach((cartItem) => {
      // Check if this product is already in the cart:
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId:'1'
      });
    }
    this.savetoStorage();
  },
  removeFromCart(productId){
    const newCart=[]
    this.cartItems.forEach((cartItem)=>{
     if(cartItem.productId!==productId){
       newCart.push(cartItem);
     }
    });
    this.cartItems=newCart;
    this.savetoStorage();
   }
};
cart.loadfromStorage();
//cart.addtocart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
//console.log(cart);

