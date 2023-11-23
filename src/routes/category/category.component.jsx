import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCategoriesMap, selectIsCategoriesLoading } from "../../store/categories/categories.selector"

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component.jsx";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? (<Spinner />) : (
                    <CategoryContainer>
                        { products &&
                             products.map((product) => <ProductCard key={ product.id } product={product} />)
                        }
                    </CategoryContainer>
                )
            }
        </Fragment>
    );
};

export default Category;