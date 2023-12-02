import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '../Forms/Button';
import { FavoriteRecipeType, RecipeType } from '../types';
import { getRecipesById } from '../../services/fetchAPI';
import RecipesContext from '../../context/RecipesContext';
import isFavoriteImage from '../../images/blackHeartIcon.svg';
import notFavoriteImage from '../../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  // const navigate = useNavigate();
  /*   const [recipe, setRecipe] = useState<RecipeType[]>([]); */
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean;
  }>({});

  const { recipe,
    setRecipe,
    addFavoriteRecipe,
    isFavorite,
    setIsFavorite,
    copyMessage,
    copyLinkDetail } = useContext(RecipesContext);

  // const recipeId = location.pathname === `/meals/${id}/in-progress`
  //   ? 'idMeal' : 'idDrink';

  const pathId = location.pathname === `/meals/${id}/in-progress`
    ? `/meals/${id}`
    : `/drinks/${id}`;

  const localStorageKey: string = 'inProgressRecipes';

  const getRecipes = async () => {
    try {
      const recipeById = await getRecipesById(pathId, id as string);
      setRecipe(recipeById);
      const storedInProgressRecipes: {
        [key: string]: { [key: string]: boolean } } = JSON.parse(localStorage
        .getItem(localStorageKey) || '{}');
      if (id) {
        setCheckedIngredients(storedInProgressRecipes[id] || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setCheckedIngredients((prevCheckedIngredients) => {
      const updatedIngredients = {
        ...prevCheckedIngredients,
        [index]: !prevCheckedIngredients[index],
      };
      // Save to localStorage
      const storedInProgressRecipes = JSON
        .parse(localStorage.getItem(localStorageKey) || '{}');
      if (id) {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            ...storedInProgressRecipes,
            [id]: updatedIngredients,
          }),
        );
      }

      return updatedIngredients;
    });
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

  const recipeId = location.pathname === `/meals/${id}` ? 'idMeal' : 'idDrink';
  const img = location.pathname === `/meals/${id}` ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === `/meals/${id}` ? 'strMeal' : 'strDrink';
  const alcoholicOrNot = location.pathname === `/meals/${id}` ? '' : 'strAlcoholic';
  const nationality = location.pathname === `/meals/${id}` ? 'strArea' : '';
  const type = location.pathname === `/meals/${id}` ? 'meal' : 'drink';

  const handleClickFavorite = () => {
    const favoriteRecipeObject: FavoriteRecipeType = {
      id,
      type,
      nationality: recipe[0][nationality] === undefined ? '' : recipe[0][nationality],
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0][alcoholicOrNot] === undefined
        ? '' : recipe[0][alcoholicOrNot],
      name: recipe[0][name],
      image: recipe[0][img],
    };
    addFavoriteRecipe(favoriteRecipeObject);
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
      <input
        type="image"
        src={ isFavorite ? isFavoriteImage : notFavoriteImage }
        className="btn-category"
        alt="blackHeartIcon"
        data-testid="favorite-btn"
        onClick={ () => handleClickFavorite() }
        style={ { maxWidth: '100%', maxHeight: '100%' } }
      />
      <Button
        dataTestId="share-btn"
        buttonLabel="Compartilhar"
        onClick={ () => copyLinkDetail() }
      />
      {copyMessage && (
        <p>Link copied!</p>
      )}
      <Button
        dataTestId="finish-recipe-btn"
        buttonLabel="Finalizar"
        onClick={ () => {} }
      />
    </div>
  );
}
export default RecipeInProgress;
