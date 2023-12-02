import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '../Forms/Button';
import { FavoriteRecipeType } from '../types';
import { getRecipesById } from '../../services/fetchAPI';
import RecipesContext from '../../context/RecipesContext';
import isFavoriteImage from '../../images/blackHeartIcon.svg';
import notFavoriteImage from '../../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const [isEnable, setIsEnable] = useState(false);

  const { recipe,
    setRecipe,
    addFavoriteRecipe,
    isFavorite,
    setIsFavorite,
    copyMessage,
    copyLinkDetail,
    favoritesRecipes } = useContext(RecipesContext);

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
        if (pathId === `/meals/${id}`) {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({
              ...storedInProgressRecipes,
              meals: {
                ...storedInProgressRecipes.meals,
                [id]: updatedIngredients,
              },
            }),
          );
        } else {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({
              ...storedInProgressRecipes,
              drinks: {
                ...storedInProgressRecipes.drinks,
                [id]: updatedIngredients,
              },
            }),
          );
        }
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

  /*   const recipeId = location.pathname === `/meals/${id}` ? 'idMeal' : 'idDrink'; */
  const imgPath = location.pathname === `/meals/${id}/in-progress`
    ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === `/meals/${id}/in-progress` ? 'strMeal' : 'strDrink';
  const alcoholicOrNot = location.pathname === `/meals/${id}/in-progress`
    ? '' : 'strAlcoholic';
  const nationality = location.pathname === `/meals/${id}/in-progress` ? 'strArea' : '';
  const type = location.pathname === `/meals/${id}/in-progress`
    ? 'meal' : 'drink';

  const handleClickFavorite = () => {
    const favoriteRecipeObject: FavoriteRecipeType = {
      id,
      type,
      nationality: recipe[0][nationality] === undefined ? '' : recipe[0][nationality],
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0][alcoholicOrNot] === undefined
        ? '' : recipe[0][alcoholicOrNot],
      name: recipe[0][name],
      image: recipe[0][imgPath],
    };
    console.log(favoriteRecipeObject);
    addFavoriteRecipe(favoriteRecipeObject);
  };

  const hrefReplaced = window.location.href.replace('/in-progress', '');

  /*   console.log(hrefSplit);
 */
  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
    if (getFavoriteRecipes) {
      const favoriteRecipesIds = getFavoriteRecipes.map(
        (recipeMap: FavoriteRecipeType) => recipeMap.id,
      );
      if (favoriteRecipesIds.includes(id as string)) {
        setIsFavorite(true);
      }
    }
    getRecipes();
  }, [location.pathname, id]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
  }, [favoritesRecipes]);

  /*   useEffect(() => {
    const storedInProgressRecipes: {
      [key: string]: { [key: string]: boolean } } = JSON.parse(localStorage
      .getItem(localStorageKey) || '{}');
  }, []); */

  return (
    <div>
      { recipe && (
        <div>
          <img
            data-testid="recipe-photo"
            src=""
            alt="Imagem do prato"
          />
          <h2 data-testid="recipe-title">Titulo</h2>
          <h3>Ingredientes:</h3>
          {renderIngredientsAndMeasures()}
          <h4 data-testid="recipe-category">Categoria</h4>
          <span data-testid="instructions">
            Instruções

          </span>
        </div>
      )}

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
        onClick={ () => copyLinkDetail(hrefReplaced) }
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
