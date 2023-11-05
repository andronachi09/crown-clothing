import { useContext } from "react";
import CustomButton, { BUTTON_TYPE_CLASSES } from "../custom-button/custom-button.component";

import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addProductToCart } = useContext(CartContext);

  const addProductsToCart = () => addProductToCart(product);

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