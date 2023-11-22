import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";

import { CheckoutItemContainer, ImageContainer, Value, Quantity, Arrow, QuantityValue, RemoveButton } from "./checkout-item.styles";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    const dispatch = useDispatch();
    const checkoutItems = useSelector(selectCartItems);

    const deleteItemHandler = () => dispatch(clearItemFromCart(checkoutItems, cartItem));
    const increaseItemQuantityHandler = () => dispatch(addItemToCart(checkoutItems, cartItem));
    const decreaseItemQuantityHandler = () => dispatch(removeItemFromCart(checkoutItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={ imageUrl } alt={ `${ name }` } />
            </ImageContainer>
            <Value>{ name }</Value>
            <Quantity>
                <Arrow onClick={decreaseItemQuantityHandler}>
                    &#10094;
                </Arrow>
                <QuantityValue>{ quantity }</QuantityValue>
                <Arrow onClick={ increaseItemQuantityHandler }>
                    &#10095;
                </Arrow>
            </Quantity>
            <Value>{ price }</Value>
            <RemoveButton onClick={ deleteItemHandler }>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
