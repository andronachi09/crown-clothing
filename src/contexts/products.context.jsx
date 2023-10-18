import { createContext, useState } from "react";
import SHOP_DATA from "../shop-data.json"

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setCurrentProducts] = useState(SHOP_DATA);
    const value = { products, setCurrentProducts };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};