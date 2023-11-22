import { useSelector, useDispatch } from "react-redux";

import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartAmount = useSelector(selectCartCount);
    const dispatch = useDispatch();


    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{ cartAmount }</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;