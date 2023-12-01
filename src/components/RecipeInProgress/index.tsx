import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Forms/Button';
import { RecipeType } from '../types';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);

  const recipeId = location.pathname === `/meals/${id}` ? 'idMeal' : 'idDrink';

  const renderIngredients = (recipeDetail: RecipeType) => {
    const ingredients = Object.keys(recipeDetail)
      .filter((key) => key.includes('strIngredient') && recipeDetail[key]);
    const measures = Object.keys(recipeDetail)
      .filter((key) => key.includes('strMeasure') && recipeDetail[key]);

    return ingredients.map((ingredient, index) => (
      <label key={ index } data-testid={ `${index}-ingredient-step` }>
        <input type="checkbox" />
        {`${recipeDetail[ingredient]} - ${recipeDetail[measures[index]]}`}
      </label>
    ));
  };

  return (
    <div>
      {recipe.map((recipeDetail: RecipeType, index) => (
        <div key={ recipeDetail[recipeId] }>
          <img
            data-testid="recipe-photo"
            src="alguma caminho"
            alt="alguma coisa"
          />
          <h2
            data-testid="recipe-title"
          >
            Título da receita
          </h2>
          <h3>Ingredientes:</h3>
          {renderIngredients(recipeDetail)}
          <p data-testid="recipe-category">Categoria</p>
          <h2
            data-testid="instructions"
          >
            Intruções
          </h2>
        </div>
      ))}
      <Button
        dataTestId="share-btn"
        buttonLabel="Compartilhar"
        onClick={ () => {} }
      />
      <Button
        dataTestId="favorite-btn"
        buttonLabel="Favoritar"
        onClick={ () => {} }
      />
      <Button
        dataTestId="finish-recipe-btn"
        buttonLabel="Finalizar"
        onClick={ () => {} }
      />
    </div>
  );
}
export default RecipeInProgress;