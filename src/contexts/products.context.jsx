import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setCurrentProducts] = useState([]);
    const value = { products, setCurrentProducts };

    //ran only once for setting the collection in Firestore Database. SHOP_DATA initail js file with collections and objects
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};