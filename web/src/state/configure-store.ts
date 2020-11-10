import { applyMiddleware, createStore, Store } from "redux";
import { ApplicationState, rootReducer, rootSaga } from "./ducks";
import { sagaMiddleware } from "./middlewares";
import { logger } from "redux-logger";
import "./utils/axios"; // Initial middleware

export const configureStore = (
    initialState: ApplicationState
): Store<ApplicationState> => {
    const middlewares: any[] = [sagaMiddleware];

    if (process.env.NODE_ENV === "development") {
        middlewares.push(logger);
    }

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
