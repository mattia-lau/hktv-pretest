import { Stock } from "./stock";

export interface Product {
    code: string;
    name: string;
    weight: number;
    unit: "G" | "KG" | "ML" | "L";
    stocks?: Stock[];
}
