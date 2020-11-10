import { Inventory } from "./inventory";
import { Product } from "./product";

export interface Stock {
    id?: number;
    inventory: Inventory;
    product: Product;
    qty: number;
}
