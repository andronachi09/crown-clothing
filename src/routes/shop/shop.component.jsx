import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCategoriesStartAsync } from "../../store/categories/categories.action";

import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('hai pfidar');
        dispatch(fetchCategoriesStartAsync());
    }, []);

    return (
        <Routes>
            <Route index element={< CategoriesPreview />}/>
            <Route path=":category" element={ <Category /> }/>
        </Routes>
    );
};

export default Shop;