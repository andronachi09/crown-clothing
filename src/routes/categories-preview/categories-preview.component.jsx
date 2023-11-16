import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/categories.selector"

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title]; //set products to a const, getting products out from categoriesMap object
                return <CategoryPreview key={ title } products={ products } title={ title }> </CategoryPreview>
            })}
        </Fragment>
    );
};

export default CategoriesPreview;