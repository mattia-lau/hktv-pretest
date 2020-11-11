import { Product } from "./product";
import { Stock } from "./stock";

export interface History {
    createdAt: string;
    from: Stock;
    to: Stock;
    product: Product;
    qty: number;
}
