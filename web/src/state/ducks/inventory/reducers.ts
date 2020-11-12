import { notification } from "antd";
import { createReducer, PayloadAction } from "typesafe-actions";
import { Inventory, Product } from "../../../types";
import { createInventoryAsync, fetchInventoryAsync } from "./sagas";

export interface InventoryReducerState {
    inventories: Inventory[];
    loading: boolean;
}

const initalState: InventoryReducerState = {
    inventories: [],
    loading: false,
};

export const inventoryReducer = createReducer<InventoryReducerState>(
    initalState
)
    .handleAction(
        fetchInventoryAsync.request,
        (state: InventoryReducerState, action: any): InventoryReducerState => {
            return {
                ...state,
                loading: true,
            };
        }
    )
    .handleAction(
        fetchInventoryAsync.success,
        (
            state: InventoryReducerState,
            action: PayloadAction<string, Product[]>
        ): InventoryReducerState => {
            const { payload } = action;
            return {
                ...state,
                inventories: payload,
                loading: false,
            };
        }
    )
    .handleAction(
        fetchInventoryAsync.failure,
        (state: InventoryReducerState, action: any): InventoryReducerState => {
            return {
                ...state,
                loading: false,
            };
        }
    )
    .handleAction(
        createInventoryAsync.request,
        (state: InventoryReducerState, action: any): InventoryReducerState => {
            return {
                ...state,
            };
        }
    )
    .handleAction(
        createInventoryAsync.success,
        (
            state: InventoryReducerState,
            action: PayloadAction<string, Product>
        ): InventoryReducerState => {
            const { payload } = action;
            return {
                ...state,
                inventories: [...state.inventories, payload],
            };
        }
    )
    .handleAction(
        createInventoryAsync.failure,
        (state: InventoryReducerState, action: any): InventoryReducerState => {
            return {
                ...state,
            };
        }
    );
