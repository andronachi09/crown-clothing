import { CartItemContainer, Image, ItemDetails, ItemDetail} from "./cart-item.styles";

const CartItem = ({ item }) => {
    const { name, price,  quantity, imageUrl } = item;
    return (
        <CartItemContainer>
            <Image src={ imageUrl } alt={`${ name }`} />
            <ItemDetails>
                <ItemDetail>{ name }</ItemDetail>
                <ItemDetail>{ quantity } x ${ price }</ItemDetail>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;