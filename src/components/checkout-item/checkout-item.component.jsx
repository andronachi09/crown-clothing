import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { CheckoutItemContainer, ImageContainer, Value, Quantity, Arrow, QuantityValue, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    const { deleteCartItem, addProductToCart, decreaseProductQuantity } = useContext(CartContext);

    const deleteItemHandler = () => deleteCartItem(cartItem);
    const increaseItemQuantityHandler = () => addProductToCart(cartItem);
    const decreaseItemQuantityHandler = () => decreaseProductQuantity(cartItem);

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
