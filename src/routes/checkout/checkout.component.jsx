import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
    const { cartTotal, currentProducts } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                 <div className="header-block">
                    <span>Description</span>
                </div>
                 <div className="header-block">
                    <span>Quantity</span>
                </div>
                 <div className="header-block">
                    <div>Price</div>
                </div>
                 <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {currentProducts.map((product) => (<CheckoutItem key={product.id} cartItem={product} />))}
            <span className="total">Total: ${ cartTotal }</span>
        </div>
    );
};

export default Checkout;