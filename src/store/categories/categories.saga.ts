import { takeLatest, all, call, put } from "typed-redux-saga";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export  function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments, 'categories'); //call when we need to fetch something
        yield* put(fetchCategoriesSuccess(categoriesArray)) //put = generator version dispatch
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync) //takeLatest - latest action type
};

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
};