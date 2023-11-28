import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategoties, getDrinksAPI, getMealsAPI } from '../../services/fetchAPI';
import { CategoriesType, RecipeType } from '../types';

function Recipes() {
  const location = useLocation();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);

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
  }
  
  useEffect(() => {
    getData();
    getCategories();
  }, []);  

  const id = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  const img = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <>
    <div>
      {categories && categories.map(({strCategory}: CategoriesType, index) => (
        <button
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </div>
    <div>
      {recipes && recipes.map((recipe: RecipeType, index) => (
        
        <div
          key={ recipe[id] }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe[img] }
            alt={ recipe[name] }
            data-testid={ `${index}-card-img` }
            width={'100px'}
          />
          <p
            data-testid={ `${index}-card-name` }
          >{recipe[name]}</p>
        </div>
      ))}
    </div>
  </>
  );
}

export default Recipes;
