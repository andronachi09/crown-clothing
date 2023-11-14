import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTIONS = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    IS_CART_OPEN: "IS_CART_OPEN"
};

const INITIAL_STATE = {
    currentProducts: [],
    isCartOpen: false,
    cartAmount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };

         case CART_ACTIONS.IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    };
};

export const CartProvider = ({ children }) => {
    const [{ currentProducts, isCartOpen, cartAmount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // dispatch new action with payload: newCartItems, newCartTotal, newCartCount
    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total, product) => total + product.quantity * product.price, 0);
        const newCartAmount = newCartItems.reduce((total, product) => total + product.quantity, 0);

        dispatch(
            createAction(CART_ACTIONS.SET_CART_ITEMS, {
                currentProducts: newCartItems,
                cartTotal: newCartTotal,
                cartAmount: newCartAmount
            })
        )
    };

    const addProductToCart = (productToAdd) => {
        const newCartItems = addCardItemToCartHelper(currentProducts, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const decreaseProductQuantity = (itemToDecreaseQuantity) => {
        const newCartItems = decreaseCartItemQuantityHelper(currentProducts, itemToDecreaseQuantity);
        updateCartItemsReducer(newCartItems);
    };

    const deleteCartItem = (itemToDelete) => {
        const newCartItems = deleteCartItemHelper(currentProducts, itemToDelete);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTIONS.IS_CART_OPEN, bool));
    };

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