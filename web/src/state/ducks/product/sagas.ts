import { all, call, put, takeEvery } from "redux-saga/effects";
import { createAsyncAction } from "typesafe-actions";
import { Product } from "../../../types";
import {
    CreateProductActionTypes,
    FetchProductActionTypes,
} from "./action-types";
import { fetch, create } from "./actions";

export const fetchProductAsync = createAsyncAction(
    FetchProductActionTypes.FETCH_PRODUCT_REQUEST,
    FetchProductActionTypes.FETCH_PRODUCT_SUCCESS,
    FetchProductActionTypes.FETCH_PRODUCT_FAILURE
)<any, Product[], Error>();

export const createProductAsync = createAsyncAction(
    CreateProductActionTypes.CREATE_PRODUCT_REQUEST,
    CreateProductActionTypes.CREATE_PRODUCT_SUCCESS,
    CreateProductActionTypes.CREATE_PRODUCT_FAILURE
)<Product, Product | Product[], Error>();

function* fetchProductSaga(
    action: ReturnType<typeof fetchProductAsync.request>
): Generator {
    try {
        const response: any = yield call(fetch);
        yield put(fetchProductAsync.success(response.data));
    } catch (err) {
        yield put(fetchProductAsync.failure(err));
    }
}

function* createProductSaga(
    action: ReturnType<typeof createProductAsync.request>
): Generator {
    try {
        const response: any = yield call(create, action.payload);
        yield put(createProductAsync.success(response.data));
    } catch (err) {
        yield put(createProductAsync.failure(err));
    }
}

export function* productSaga() {
    yield all([
        takeEvery(
            FetchProductActionTypes.FETCH_PRODUCT_REQUEST,
            fetchProductSaga
        ),
        takeEvery(
            CreateProductActionTypes.CREATE_PRODUCT_REQUEST,
            createProductSaga
        ),
    ]);
}
