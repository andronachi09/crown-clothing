import "../src/categories.styles.scss"

const App = () => {

  const categories = [
    {
      title: 'Hats',
      id: 1
    },
     {
      title: 'Jackets',
      id: 2
    },
      {
      title: 'Sneakers',
      id: 3
    },
       {
      title: 'Men',
      id: 4
    },
        {
      title: 'Women',
      id: 5
    },
  ]

  return (
    <div className="categories-container">
      {
      categories.map(({ title, id }) => {
        return (
          <div key={ id } className="category-container">
          {/* <img /> */}
          <div className="category-body-container">
              <h2>{ title }</h2>
              <p>Shop now!</p>
          </div>
          </div>
         )
        })
      }
    </div>
  );
}

export default App;
