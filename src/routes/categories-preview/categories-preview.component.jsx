import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

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