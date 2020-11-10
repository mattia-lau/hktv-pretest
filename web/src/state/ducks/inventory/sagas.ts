import { all, call, put, takeEvery } from "redux-saga/effects";
import { createAsyncAction } from "typesafe-actions";
import { Product } from "../../../types";
import {
    CreateInventoryActionTypes,
    FetchInventoryActionTypes,
} from "./action-types";
import { create, fetch } from "./actions";

export const fetchInventoryAsync = createAsyncAction(
    FetchInventoryActionTypes.FETCH_INVENTORY_REQUEST,
    FetchInventoryActionTypes.FETCH_INVENTORY_SUCCESS,
    FetchInventoryActionTypes.FETCH_INVENTORY_FAILURE
)<any, Product[], Error>();

export const createInventoryAsync = createAsyncAction(
    CreateInventoryActionTypes.CREATE_INVENTORY_REQUEST,
    CreateInventoryActionTypes.CREATE_INVENTORY_SUCCESS,
    CreateInventoryActionTypes.CREATE_INVENTORY_FAILURE
)<Product, Product, Error>();

function* fetchInventorySaga(
    action: ReturnType<typeof fetchInventoryAsync.request>
): Generator {
    try {
        const response: any = yield call(fetch);
        yield put(fetchInventoryAsync.success(response.data));
    } catch (err) {
        yield put(fetchInventoryAsync.failure(err));
    }
}

function* createInventorySaga(
    action: ReturnType<typeof createInventoryAsync.request>
): Generator {
    try {
        const response: any = yield call(create, action.payload);
        yield put(createInventoryAsync.success(response.data));
    } catch (err) {
        yield put(createInventoryAsync.failure(err));
    }
}

export function* inventorySaga() {
    yield all([
        takeEvery(
            FetchInventoryActionTypes.FETCH_INVENTORY_REQUEST,
            fetchInventorySaga
        ),
        takeEvery(
            CreateInventoryActionTypes.CREATE_INVENTORY_REQUEST,
            createInventorySaga
        ),
    ]);
}
