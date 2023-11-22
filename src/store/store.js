import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    };

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//root-reducer, a combination of all reducers. Reducers are pure functions.
//middle wares a kind of little library helpers, that run before an action hits the reducer.
//whenever we dispatch an action, before action hits the reducers, it hits the middleware first
const middleWares = [ loggerMiddleware ];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);