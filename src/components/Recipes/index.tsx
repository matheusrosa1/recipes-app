import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  getCategoties, 
  getDrinksAPI, 
  getMealsAPI, 
  getByCategory 
} from '../../services/fetchAPI';
import { CategoriesType, RecipeType } from '../types';

function Recipes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const getData = async () => {
    try {
      const recipesData = location.pathname === '/meals'
        ? await getMealsAPI() : await getDrinksAPI();
      const recipesDataSplice = [...recipesData].splice(0, 12);
      setRecipes(recipesDataSplice as RecipeType[]);
    } catch (error) {
      console.log('Erro ao buscar os dados na API', error);
    }
  };

  const getCategories = async () => {
    try {
      const categoriesData = await getCategoties(location.pathname);
      const categoriesDataSplice = [...categoriesData].splice(0, 5);
      setCategories(categoriesDataSplice);
    } catch (error) {
      console.log('Erro ao buscar os dados na API', error);
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
    const recipesData = await getByCategory(location.pathname, category);
    const recipesDataSplice = [...recipesData].splice(0, 12);
    setRecipes(recipesDataSplice as RecipeType[]);
  };

  const id = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  const img = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <>
      <div>
        {categories && categories.map(({ strCategory }: CategoriesType, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleFilterByCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
      </div>
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => getData() }
        >
          All
        </button>
      </div>
      <div>
        {recipes && recipes.map((recipe: RecipeType, index) => (

          <div
            key={ recipe[id] }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => navigate(`${location.pathname}/${recipe[id]}`) }
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
        ))}
      </div>
    </>
  );
}

export default Recipes;
