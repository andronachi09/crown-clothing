import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap, selectIsCategoriesLoading } from "../../store/categories/categories.selector"

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]; //set products to a const, getting products out from categoriesMap object
                    return (<CategoryPreview key={title} products={products} title={title} />);
                })
            )}
        </Fragment>
    );
};

export default CategoriesPreview;