import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCategoties, fetchByCategory, fetchRecipes } from '../../services/fetchAPI';
import { CategoriesType, RecipeType } from '../types';
import { Buttom } from '../Forms/Button';

function Recipes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const getData = async () => {
    try {
      const recipesData = await fetchRecipes(location.pathname);
      const recipesDataSplice = [...recipesData].splice(0, 12);
      setRecipes(recipesDataSplice as RecipeType[]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const categoriesData = await fetchCategoties(location.pathname);
      const categoriesDataSplice = [...categoriesData].splice(0, 5);
      setCategories(categoriesDataSplice);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipesByCategory = async (category: string) => {
    try {
      const recipesData = await fetchByCategory(location.pathname, category);
      const recipesDataSplice = [...recipesData].splice(0, 12);
      setRecipes(recipesDataSplice as RecipeType[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const handleFilterByCategory = async (category: string) => {
    setToggle(!toggle);
    if (toggle) {
      getData();
      return;
    }
    getRecipesByCategory(category);
  };

  const id = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  const img = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <>
      <div>
        {categories && categories.map(({ strCategory }: CategoriesType, index) => (
          <div key={ index }>
            <Buttom
              dataTestId={ `${strCategory}-category-filter` }
              onClick={ () => handleFilterByCategory(strCategory) }
              buttonLabel={ strCategory }
            />
          </div>
        ))}
      </div>
      <Buttom
        dataTestId="All-category-filter"
        onClick={ () => getData() }
        buttonLabel="All"
      />
      <div className="recipes-container">
        {recipes && recipes.map((recipe: RecipeType, index) => (
          <div
            className="recipes-item"
            key={ recipe[id] }
          >

            <div
              data-testid={ `${index}-recipe-card` }
              onClick={ () => navigate(`${location.pathname}/${recipe[id]}`) }
              onKeyDown={ (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`${location.pathname}/${recipe[id]}`);
                }
              } }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ recipe[img] }
                alt={ recipe[name] }
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {recipe[name]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Recipes;
