import { all, call } from "typed-redux-saga/macro";
import { categoriesSaga } from "./categories/categories.saga";
import { usersSaga } from "./user/user.saga";

export function* rootSaga() {
    yield* all([call(categoriesSaga), call(usersSaga)]);
};