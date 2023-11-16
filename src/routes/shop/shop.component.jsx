import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/categories.action";

import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        dispatch(setCategoriesMap(categoryMap));
    };

    getCategoriesMap();
}, [dispatch]);

    return (
        <Routes>
            <Route index element={< CategoriesPreview />}/>
            <Route path=":category" element={ <Category /> }/>
        </Routes>
    );
};

export default Shop;