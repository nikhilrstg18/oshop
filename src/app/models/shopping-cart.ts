import { ShoppingCartItem } from './shoppin-cart-item';
export class ShoppingCart{
    
    constructor(public items: ShoppingCartItem[]){}

    get totalItemsCount(){
        let count:number =0;
        for (let productId in this.items) {
          count += this.items[productId].quantity;
        return count;
        }
    }
}