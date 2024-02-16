import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import isFavoriteImage from '../../images/like.svg';
import notFavoriteImage from '../../images/dislike.png';
import { Button } from '../../components/Forms/Button';
import mealIcon from '../../images/icone-prato.svg';
import drinkIcon from '../../images/icone-prato (1).svg';
import shareButton from '../../images/Share.svg';
import {
  CheckedIngredientsType,
  DoneRecipeType,
  FavoriteRecipeType,
} from '../../types';
import {
  useGetFavoritesAndRecipes,
  useGetIngredientsAndMeasures,
} from '../../hooks/useEffects';
import styles from './recipeInProgress.module.css';

function RecipeInProgress() {
  const { id } = useParams<string>();
  const location = useLocation();
  const navigate = useNavigate();

  const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<CheckedIngredientsType>(
    localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')!)
      : { meals: {}, drinks: {} },
  );
  const [list, setList] = useState<string[]>(
    localStorage.getItem('list')
      ? JSON.parse(localStorage.getItem('list')!)
      : [],
  );
  const [isDisable, setIsDisable] = useState<boolean>(true);
  /* const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]); */

  const dataAtual = new Date();
  dataAtual.setUTCHours(dataAtual.getUTCHours() + 3);

  const actualDate = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1)
    .toString().padStart(2, '0')}-${dataAtual.getDate()
    .toString().padStart(2, '0')}T${dataAtual.getHours()
    .toString().padStart(2, '0')}:${dataAtual.getMinutes()
    .toString().padStart(2, '0')}:${dataAtual.getSeconds()
    .toString().padStart(2, '0')}.${dataAtual.getMilliseconds()
    .toString().padStart(3, '0')}Z`;

  const {
    recipe,
    isFavorite,
    copyMessage,
    copyLinkDetail,
    favoritesRecipes,
    doneRecipes,
    addDoneRecipes,
    handleClickFavorite,
    getPath,
  } = useContext(RecipesContext);

  const mealsOrDrinks = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const hrefReplaced = window.location.href.replace('/in-progress', '');

  const type = recipe[0] && mealsOrDrinks === 'meals' ? 'meal' : 'drink';

  useGetFavoritesAndRecipes(mealsOrDrinks, id as string);
  useGetIngredientsAndMeasures(recipe, setIngredientsWithMeasures);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
  }, [favoritesRecipes]);

  const handleCheckedIngredients = (ingredient: string) => {
    if (list.includes(ingredient)) {
      const newList = list.filter((item) => item !== ingredient);
      setList(newList);
    } else {
      setList([...list, ingredient]);
    }
  };

  useEffect(() => {
    setCheckedIngredients({
      ...checkedIngredients,
      [mealsOrDrinks]: {
        ...checkedIngredients[mealsOrDrinks],
        [id as string]: list,
      },
    });

    const stateLenght = ingredientsWithMeasures.length;
    const listLenght = list.length;
    if (stateLenght === listLenght) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [list, ingredientsWithMeasures]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
    localStorage.setItem('list', JSON.stringify(list));
  }, [checkedIngredients]);

  const handleClickEndRecipe = () => {
    const doneRecipeObject: DoneRecipeType = {
      id,
      type,
      nationality: recipe[0]
      && recipe[0][getPath('nationality', mealsOrDrinks)] === undefined
        ? '' : recipe[0] && recipe[0][getPath('nationality', mealsOrDrinks)],
      category: recipe[0] && recipe[0][getPath('category', mealsOrDrinks)],
      alcoholicOrNot: recipe[0]
       && recipe[0][getPath('alcoholicOrNot', mealsOrDrinks)] === undefined
        ? ''
        : recipe[0] && recipe[0][getPath('alcoholicOrNot', mealsOrDrinks)],
      name: recipe[0] && recipe[0][getPath('name', mealsOrDrinks)],
      image: recipe[0] && recipe[0][getPath('img', mealsOrDrinks)],
      doneDate: actualDate,
      tags: recipe[0]
      && recipe[0][getPath('tags', mealsOrDrinks)]?.split(',') === undefined
        ? [] : recipe[0] && recipe[0][getPath('tags', mealsOrDrinks)]?.split(','),
    };
    addDoneRecipes(doneRecipeObject);

    setList([]);
    JSON.stringify(localStorage.setItem('list', ''));
  };

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    if (doneRecipes.length > 0
      && doneRecipes.map((doneRecipe) => doneRecipe.id).includes(id)) {
      navigate('/done-recipes');
    }
  }, [doneRecipes]);
  const mealOrDrink = location.pathname.split('/')[1];

  return (
    <div className={ styles.body }>
      <div className={ styles.container }>
        <div className={ styles.iconMealOrDrink }>
          <img
            src={ location.pathname === `/meals/${id}/in-progress`
              ? mealIcon : drinkIcon }
            alt="Icon Drink or Meal"
          />
        </div>
        <div className={ styles.buttons }>
          <button
            className={ styles.shareButton }
            data-testid="share-btn"
            id="btn-share"
            onClick={ () => copyLinkDetail(window.location.href) }
          >
            <img src={ shareButton } alt="Share Button" />

          </button>
          <input
            className={ styles.favoriteImage }
            type="image"
            src={ isFavorite ? isFavoriteImage : notFavoriteImage }
            alt="blackHeartIcon"
            data-testid="favorite-btn"
            onClick={ () => handleClickFavorite(id as string, type, mealOrDrink) }
            style={ { maxWidth: '100%', maxHeight: '100%' } }
          />
        </div>
        <div className={ styles.recipeContainer }>
          <div className={ styles.componente }>
            <img
              className={ styles.imageRecipe }
              data-testid="recipe-photo"
              src={ recipe[0] && recipe[0][getPath('img', mealsOrDrinks)] }
              alt="Imagem do prato"
              height={ 200 }
            />
            <h2
              data-testid="recipe-title"
              className={ styles.title }
            >
              {recipe[0]
      && recipe[0][getPath('name', mealsOrDrinks)]}

            </h2>
          </div>
          <p
            data-testid="recipe-category"
            className={ styles.category }
          >
            {`${recipe[0] && recipe[0][getPath('category', mealsOrDrinks)]}`}
          </p>
          <h3>Ingredients</h3>
          <div className={ styles.ingredientsContainer }>
            {ingredientsWithMeasures.map((ingredient, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  className={ styles.checkboxCustom }
                  type="checkbox"
                  onChange={ () => handleCheckedIngredients(ingredient) }
                />
                <span>{ingredient}</span>
              </label>
            ))}
          </div>
          <h3>Instructions</h3>
          <div className={ styles.instructionsContainer }>
            <span
              data-testid="instructions"
              className={ styles.instructions }
            >
              {`${recipe[0]
             && recipe[0][getPath('instructions', mealsOrDrinks)]}`}
            </span>
          </div>
        </div>
        <button
          className={ styles.finishButton }
          type="button"
          id="btn-start-recipe"
          data-testid="finish-recipe-btn"
          disabled={ isDisable }
          onClick={ () => handleClickEndRecipe() }
        >
          <span>Finalizar</span>
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
