// here we eill generate the store object that we will use inside application
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//root-reducer, a combination of all reducers. Reducers are pure functions.
//middle wares a kind of little library helpers, that run before an action hits the reducer.
//whenever we dispatch an action, before action hits the reducers, it hits the middl eware first
const middleWares = [ logger ];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);