import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getRecipesById } from '../../services/fetchAPI';
import { RecipeType } from '../types';

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

  const recipeId = location.pathname === `/meals/${id}` ? 'idMeal' : 'idDrink';
  const img = location.pathname === `/meals/${id}` ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === `/meals/${id}` ? 'strMeal' : 'strDrink';

  const renderIngredients = (recipeDetail: RecipeType) => {
    return Object.entries(recipeDetail)
      .filter(([key, value]) => key
        .includes('strIngredient') && value !== null && value !== '')
      .map(([key, value]) => (
        <li key={ key }>{value}</li>
      ));
  };

  return (
    <div>
      {recipe.map((recipeDetail: RecipeType, index) => (
        <div key={ recipeDetail[recipeId] }>
          <img
            data-testid="recipe-photo"
            src={ recipeDetail[img] }
            alt={ recipeDetail[name] }
            width="350px"
          />
          <h2
            data-testid="recipe-title"
          >
            {recipeDetail[name]}

          </h2>
          <h4
            data-testid="recipe-category"
          >
            {recipeDetail.strCategory}
          </h4>
          <p
            data-testid="instructions"
          >
            {recipeDetail.strInstructions}

          </p>
          <h3>Ingredients:</h3>
          <ul
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {renderIngredients(recipeDetail)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetails;
