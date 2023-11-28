import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getRecipesById } from '../../services/fetchAPI';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeById = await getRecipesById(location.pathname, id as string);
        console.log(recipeById);
        setRecipe(recipeById);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, [location.pathname, id]);

  const recipeId = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  const img = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <div>
      {/*       {recipe.map((recipeDetail) => (
        <li key={recipeDetail.recipeId}>

        </li>
      ))} */}
    </div>
  );
}

export default RecipeDetails;
