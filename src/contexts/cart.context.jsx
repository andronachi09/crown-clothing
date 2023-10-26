import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    currentProducts: [],
    addProductToCart: () => { },
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartAmount: 0
});

export const CartProvider = ({ children }) => {
    const [currentProducts, setCurrentProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartAmount, setCartAmount] = useState(0);

    const addProductToCart = (productToAdd) => {
        setCurrentProducts(addCardItem(currentProducts, productToAdd));
    };

    useEffect(() => {
        const newCartAmount = currentProducts.reduce((total, product) => total + product.quantity, 0);
        setCartAmount(newCartAmount);
    }, [currentProducts]);

    const value = { isCartOpen, setIsCartOpen, currentProducts, addProductToCart, cartAmount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

//helper function which helps to find in the existing array, any card items that exist that match the id productToAdd. If we find it we increment the quntity, otherwise
//crete a new card item
const addCardItem = (currentProducts, productToAdd) => {
    //find if currentProducts contains productToAdd
    const existingCartProduct = currentProducts.find(
        (product) => product.id === productToAdd.id
    );

    //if found, increment else create
    if (existingCartProduct) {
        return currentProducts.map((currentProduct) =>
            currentProduct.id === productToAdd.id
                ? { ...currentProduct, quantity: currentProduct.quantity + 1 }
                : currentProduct
        );
    };

    //return new modified array
    return [...currentProducts, { ...productToAdd, quantity: 1 }];
};