import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {
    inventoryReducer,
    InventoryReducerState,
    inventorySaga,
} from "./inventory";
import { productReducer, ProductReducerState, productSaga } from "./product";

export interface ApplicationState {
    product: ProductReducerState;
    inventory: InventoryReducerState;
}

export const rootReducer = combineReducers<ApplicationState>({
    product: productReducer,
    inventory: inventoryReducer,
});

export function* rootSaga() {
    yield all([fork(productSaga), fork(inventorySaga)]);
}
