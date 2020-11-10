import Axios, { AxiosResponse } from "axios";
import { Product } from "../../../types";

const path = "/inventories";

export const fetch = (): Promise<AxiosResponse<Product>> => {
    return Axios.get(path);
};

export const create = (payload: Product) => {
    return Axios.post(path, payload);
};
