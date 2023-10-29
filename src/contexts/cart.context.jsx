import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    currentProducts: [],
    isCartOpen: false,
    cartAmount: 0,
    cartTotal: 0,
    setIsCartOpen: () => { },
    addProductToCart: () => { },
    decreaseProductQuantity: () => { },
    deleteCartItems: () => { }
});

export const CartProvider = ({ children }) => {
    const [currentProducts, setCurrentProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartAmount, setCartAmount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addProductToCart = (productToAdd) => {
        setCurrentProducts(addCardItemToCartHelper(currentProducts, productToAdd));
    };

    const decreaseProductQuantity = (itemToDecreaseQuantity) => {
        setCurrentProducts(decreaseCartItemQuantityHelper(currentProducts, itemToDecreaseQuantity));
    };

    const deleteCartItem = (itemToDelete) => {
        setCurrentProducts(deleteCartItemHelper(currentProducts, itemToDelete));
    };

    useEffect(() => {
    const newCartAmount = currentProducts.reduce((total, product) => total + product.quantity, 0);
    setCartAmount(newCartAmount);
    }, [currentProducts]);

    useEffect(() => {
    const newCartTotal = currentProducts.reduce((total, product) => total + product.quantity * product.price, 0);
    setCartTotal(newCartTotal);
    }, [currentProducts]);

    const value = {
        currentProducts,
        cartAmount,
        isCartOpen,
        cartTotal,
        setIsCartOpen,
        addProductToCart,
        decreaseProductQuantity,
        deleteCartItem
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

/*
    Helper function which helps to find in the existing array, any card items that
    exist that match the id productToAdd. If we find it we increment the quntity,
    otherwise create a new card item.
    Function is also used for increasing quntity of an item/product.
*/
const addCardItemToCartHelper = (currentProducts, productToAdd) => {
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

const decreaseCartItemQuantityHelper = (currentProducts, itemToDecreaseQuantity) => {
    //find if currentProducts contains itemToDecreaseQuantity product
    const existingCartProduct = currentProducts.find(
        (product) => product.id === itemToDecreaseQuantity.id
    );

    //check if the quantity is equal to 1, if it is remove the item from cart
    if (existingCartProduct.quantity === 1) {
        return currentProducts.filter((currentProduct) => currentProduct.id !== itemToDecreaseQuantity.id);
    };

    //return back currentProducts with matching cart item with reduced quantity
     return currentProducts.map((currentProduct) =>
            currentProduct.id === itemToDecreaseQuantity.id
                ? { ...currentProduct, quantity: currentProduct.quantity - 1 }
                : currentProduct
    );
};

const deleteCartItemHelper = (currentProducts, itemToDelete) => {
    //find if currentProducts contains itemToDecreaseQuantity
    const existingCartProduct = currentProducts.find(
        (product) => product.id === itemToDelete.id
    );

    if (existingCartProduct) {
        return currentProducts.filter((currentProduct) => currentProduct.id !== itemToDelete.id);
    };
};