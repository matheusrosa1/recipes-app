import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchRecipes, getRecipesById } from '../../services/fetchAPI';
import { RecipeType } from '../types';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Se a receita atual é uma refeição, busque bebidas. Caso contrário, busque refeições.
        const type = location.pathname === `/meals/${id}`
          ? '/drinks' : '/meals';
        const newRecommendations = await fetchRecipes(type);
        setRecommendations(newRecommendations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecommendations();
  }, [location.pathname, id]);

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

  const renderIngredientsAndMeasures = (recipeDetail: RecipeType) => {
    const ingredients = Object.keys(recipeDetail)
      .filter((key) => key.includes('strIngredient') && recipeDetail[key]);
    const measures = Object.keys(recipeDetail)
      .filter((key) => key.includes('strMeasure') && recipeDetail[key]);
    return ingredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${recipeDetail[ingredient]} - ${recipeDetail[measures[index]]}`}
      </li>
    ));
  };

  return (
    <div>
      {recipe.map((recipeDetail: any, index) => (
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
          {location.pathname === `/meals/${id}` ? (
            <p data-testid="recipe-category">
              {recipeDetail.strCategory}
            </p>
          ) : (
            <p data-testid="recipe-category">
              {recipeDetail.strAlcoholic}
            </p>
          ) }
          <p
            data-testid="instructions"
          >
            {recipeDetail.strInstructions}

          </p>
          <h3>Ingredients:</h3>
          <ul
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {renderIngredientsAndMeasures(recipeDetail)}
          </ul>
          {location.pathname === `/meals/${id}` && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ recipeDetail.strYoutube }
              title="YouTube video player"
              allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <h3>Recomendadas:</h3>
          <div>
            {recommendations.slice(0, 6).map((recommendation: any, index2) => (
              <div key={ recommendation[recipeId] }>
                <img
                  data-testid={ `${index2}-recomendation-card` }
                  src={ recommendation[img] }
                  alt={ recommendation[name] }
                  width="150px"
                />
                <p
                  data-testid={ `${index2}-recomendation-title` }
                >
                  {recommendation[name]}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetails;
