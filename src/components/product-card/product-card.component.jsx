import { useDispatch, useSelector } from "react-redux";
import CustomButton, { BUTTON_TYPE_CLASSES } from "../custom-button/custom-button.component";

import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductsToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
     <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <CustomButton
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductsToCart}
      >
        Add to card
      </CustomButton>
    </ProductCardContainer>
  );
};

export default ProductCard;