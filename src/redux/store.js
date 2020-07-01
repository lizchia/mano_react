import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}


export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store); 


