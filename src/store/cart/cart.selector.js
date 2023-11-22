import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItem) => cartItem.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItem) => cartItem.reduce(
        (cartTotal, cartItem) => cartTotal + cartItem.price * cartItem.quantity,
        0
    )
);