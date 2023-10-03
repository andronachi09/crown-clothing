import Category from "../category-item/category-item.component";

import "../directory/directory.styles.scss"

const Directory = ({ categories }) => {

  return (
    <div className="directory-container">
      {
        categories.map((category) => {
          return (
            <Category key={category.id} category={category} />
          )
        })
      }
    </div>
  );
};

export default Directory;