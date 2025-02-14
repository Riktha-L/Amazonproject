import { addtocart, cart, loadfromStorage} from "../../data/cart.js";

describe('Test suit : Add to cart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
        spyOn(localStorage, 'setItem');
        loadfromStorage();
    });

    it('Adds an existing product to the cart', () => {
        // Test for adding an existing product to the cart
    });

    it('Adds a new product to the cart', () => {
        addtocart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f");
        expect(cart[0].quantity).toEqual(1);
    });
});
