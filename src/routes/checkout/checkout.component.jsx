import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.jsx";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles.jsx";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector.js";

const Checkout = () => {
    const cartTotal = useSelector(selectCartTotal);
    const currentProducts = useSelector(selectCartItems);

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