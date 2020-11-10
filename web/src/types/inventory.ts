import { Product } from "./product";
import { Stock } from "./stock";

export interface Inventory {
    code: string;
    name: string;
    stocks?: Stock[];
}
