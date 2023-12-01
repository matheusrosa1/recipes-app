import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Forms/Button';
import { RecipeType } from '../types';
import { getRecipesById } from '../../services/fetchAPI';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean;
  }>({});

  const recipeId = location.pathname === `/meals/${id}/in-progress`
    ? 'idMeal' : 'idDrink';

  const pathId = location.pathname === `/meals/${id}/in-progress`
    ? `/meals/${id}`
    : `/drinks/${id}`;

  const getRecipes = async () => {
    try {
      const recipeById = await getRecipesById(pathId, id as string);
      setRecipe(recipeById);
      console.log(recipe);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setCheckedIngredients((prevCheckedIngredients) => ({
      ...prevCheckedIngredients,
      [index]: !prevCheckedIngredients[index],
    }));
  };
  const renderIngredientsAndMeasures = () => {
    if (!recipe[0]) return null;
    const ingredients = Object.keys(recipe[0]).filter(
      (key) => key.includes('strIngredient') && recipe[0][key],
    );
    const measures = Object.keys(recipe[0]).filter(
      (key) => key.includes('strMeasure') && recipe[0][key],
    );

    return ingredients.map((ingredient, index) => (
      <label
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        style={ {
          textDecoration: checkedIngredients[index]
            ? 'line-through solid rgb(0, 0, 0)'
            : 'none',
        } }
      >
        <input
          type="checkbox"
          checked={ checkedIngredients[index] || false }
          onChange={ () => handleCheckboxChange(index) }
        />
        {`${recipe[0][ingredient]} - ${[recipe[0][measures[index]]]}`}
      </label>
    ));
  };

  useEffect(() => {
    getRecipes();
  }, [location.pathname, id]);

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src="alguma caminho"
          alt="alguma coisa"
        />
        <h2 data-testid="recipe-title">Título da receita</h2>
        <h3>Ingredientes:</h3>
        {renderIngredientsAndMeasures()}
        <p data-testid="recipe-category">Categoria</p>
        <h2 data-testid="instructions">Intruções</h2>
      </div>
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
