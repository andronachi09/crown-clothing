import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CustomButton from "../custom-button/custom-button.component.jsx";
import CartItem from "../cart-item/cart-item.component.jsx";

import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";
import { selectCartItems } from "../../store/cart/cart.selector.js";

const CartDropdown = () => {
    const currentProducts = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate("/checkout");
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    (currentProducts.length) ?
                    currentProducts.map((currentProduct) => (
                    <CartItem key={currentProduct.id} item={currentProduct} />)
                        ) : (<EmptyMessage>Cart is empty.</EmptyMessage>
                )}
            </CartItems>
            <CustomButton onClick={ goToCheckOutHandler }>Checkout</CustomButton>
        </CartDropdownContainer>
    );
};

export default CartDropdown;