import { createContext, useState } from "react";

export const CartContext = createContext({
    currentProducts: [],
    setCurrentProducts: () => null,
    isCartOpen: false,
    setIsCartOpen: () => { }
});

export const CartProvider = ({ children }) => {
    const [currentProducts, setCurrentProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { currentProducts, setCurrentProducts, isCartOpen, setIsCartOpen };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};