import { ShoppingCart } from './shopping-cart';

export class Order {

    datePlaced: number;
    items: any[];
    shipping: any;

    constructor(public UserId: string, shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.shipping = shipping;
        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });

    }
}