import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context.jsx";

import CustomButton from "../custom-button/custom-button.component.jsx";
import CartItem from "../cart-item/cart-item.component.jsx";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const { currentProducts } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate("/checkout");
    };

    return (
    <div className="cart-dropdown-container">
        <div className="cart-items">
                {currentProducts.map((currentProduct) => (
                    <CartItem key={currentProduct.id} item={currentProduct} />
                ))}
        </div>
            <CustomButton onClick={ goToCheckOutHandler }>Checkout</CustomButton>
    </div>
    );
};

export default CartDropdown;