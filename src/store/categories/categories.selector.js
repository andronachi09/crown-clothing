import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    console.log("first selector fired");
    return state.categories;
};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log("second selector fired");
        return categoriesSlice.categories
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log("second selector fired");
        return categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
    }
);