import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { loggerMiddleware } from "./middleware/logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//root-reducer, a combination of all reducers. Reducers are pure functions.
//middle wares a kind of little library helpers, that run before an action hits the reducer.
//whenever we dispatch an action, before action hits the reducers, it hits the middleware first
const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);