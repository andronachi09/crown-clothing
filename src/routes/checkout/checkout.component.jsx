import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.jsx";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles.jsx";

const Checkout = () => {
    const { cartTotal, currentProducts } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                 <HeaderBlock className="header-block">
                    <span>Description</span>
                </HeaderBlock>
                 <HeaderBlock className="header-block">
                    <span>Quantity</span>
                </HeaderBlock>
                 <HeaderBlock className="header-block">
                    <span>Price</span>
                </HeaderBlock>
                 <HeaderBlock className="header-block">
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {currentProducts.map((product) => (<CheckoutItem key={product.id} cartItem={product} />))}
            <Total>Total: ${ cartTotal }</Total>
        </CheckoutContainer>
    );
};

export default Checkout;