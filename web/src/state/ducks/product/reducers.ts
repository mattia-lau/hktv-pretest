import { notification } from "antd";
import { createReducer, PayloadAction } from "typesafe-actions";
import { Product } from "../../../types";
import { createProductAsync, fetchProductAsync } from "./sagas";

export interface ProductReducerState {
    products: Product[];
    loading: boolean;
}

const initalState: ProductReducerState = {
    products: [],
    loading: false,
};

export const productReducer = createReducer<ProductReducerState>(initalState)
    .handleAction(
        fetchProductAsync.request,
        (state: ProductReducerState, action: any): ProductReducerState => {
            return {
                ...state,
                loading: true,
            };
        }
    )
    .handleAction(
        fetchProductAsync.success,
        (
            state: ProductReducerState,
            action: PayloadAction<string, Product[]>
        ): ProductReducerState => {
            const { payload } = action;
            return {
                ...state,
                products: payload,
                loading: false,
            };
        }
    )
    .handleAction(
        fetchProductAsync.failure,
        (state: ProductReducerState, action: any): ProductReducerState => {
            return {
                ...state,
                loading: false,
            };
        }
    )
    .handleAction(
        createProductAsync.request,
        (state: ProductReducerState, action: any): ProductReducerState => {
            return state;
        }
    )
    .handleAction(
        createProductAsync.success,
        (
            state: ProductReducerState,
            action: PayloadAction<string, Product | Product[]>
        ): ProductReducerState => {
            const { payload } = action;
            const products = [...state.products]
            if (Array.isArray(payload)) {
                products.push(...payload)
            } else {
                products.push(payload)
            }
            return {
                ...state,
                products,
            };
        }
    )
    .handleAction(
        createProductAsync.failure,
        (state: ProductReducerState, action: any): ProductReducerState => {
            return state;
        }
    );
