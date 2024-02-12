import {
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/reducer/reducer.utils';
import { CART_ACTIONS_TYPES,  CartItem } from './cart.types';
import { CategoryItem } from '../categories/categories.types';

//utility functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const safeCartItems = cartItems || [];

  const existingCartItem = safeCartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return safeCartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...safeCartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const safeCartItems = cartItems || [];
  // find the cart item to remove
  const existingCartItem = safeCartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return safeCartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  };

  // return back cartItems with matching cart item with reduced quantity
  return safeCartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  const safeCartItems = cartItems || [];
  return safeCartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

//actions
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
  createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems));
  export const addItemToCart = withMatcher((cartItems: CartItem[], productToAdd: CartItem): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
});

export const removeItemFromCart = withMatcher((cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
});

export const clearItemFromCart = withMatcher((cartItems: CartItem[], cartItemToClear: CartItem): SetCartItems => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
});

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean));

//types
export type SetIsCartOpen = ActionWithPayload<CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTIONS_TYPES.SET_CART_ITEMS, CartItem[]>;