import { useContext } from "react";
import CustomButton from "../custom-button/custom-button.component";

import "./product-card.styles.scss"
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addProductToCart } = useContext(CartContext);

  const addProductsToCart = () => addProductToCart(product);

  console.log("pe");

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton buttonType='inverted' onClick={ addProductsToCart }>Add to card</CustomButton>
    </div>
  );
};

export default ProductCard;