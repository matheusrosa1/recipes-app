import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import isFavoriteImage from '../../images/blackHeartIcon.svg';
import notFavoriteImage from '../../images/whiteHeartIcon.svg';
import { Button } from '../../components/Forms/Button';
import {
  CheckedIngredientsType,
  DoneRecipeType,
  FavoriteRecipeType,
} from '../../types';
import {
  useGetFavoritesAndRecipes,
  useGetIngredientsAndMeasures,
} from '../../hooks/useEffects';

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
    addFavoriteRecipe,
    isFavorite,
    copyMessage,
    copyLinkDetail,
    favoritesRecipes,
    doneRecipes,
    addDoneRecipes,
  } = useContext(RecipesContext);

  const mealsOrDrinks = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const hrefReplaced = window.location.href.replace('/in-progress', '');

  const getPath = (field: string) => {
    switch (field) {
      case 'img':
        return mealsOrDrinks === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
      case 'name':
        return mealsOrDrinks === 'meals' ? 'strMeal' : 'strDrink';
      case 'category':
        return 'strCategory';
      case 'instructions':
        return mealsOrDrinks === 'meals' ? 'strInstructions' : 'strInstructions';
      case 'alcoholicOrNot':
        return mealsOrDrinks === 'meals' ? '' : 'strAlcoholic';
      case 'nationality':
        return mealsOrDrinks === 'meals' ? 'strArea' : '';
      case 'tags':
        return mealsOrDrinks === 'meals' ? 'strTags' : '';
      default:
        return '';
    }
  };

  const type = recipe[0] && mealsOrDrinks === 'meals' ? 'meal' : 'drink';

  useGetFavoritesAndRecipes(mealsOrDrinks, id as string);
  useGetIngredientsAndMeasures(recipe, setIngredientsWithMeasures);

  const handleClickFavorite = () => {
    const favoriteRecipeObject: FavoriteRecipeType = {
      id,
      type,
      nationality: recipe[0] && recipe[0][getPath('nationality')] === undefined
        ? '' : recipe[0] && recipe[0][getPath('nationality')],
      category: recipe[0] && recipe[0][getPath('category')],
      alcoholicOrNot: recipe[0] && recipe[0][getPath('alcoholicOrNot')] === undefined
        ? '' : recipe[0] && recipe[0][getPath('alcoholicOrNot')],
      name: recipe[0] && recipe[0][getPath('name')],
      image: recipe[0] && recipe[0][getPath('img')],
    };
    addFavoriteRecipe(favoriteRecipeObject);
  };

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
  }, [list]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
    localStorage.setItem('list', JSON.stringify(list));
  }, [checkedIngredients]);

  const handleClickEndRecipe = () => {
    const doneRecipeObject: DoneRecipeType = {
      id,
      type,
      nationality: recipe[0] && recipe[0][getPath('nationality')] === undefined
        ? '' : recipe[0] && recipe[0][getPath('nationality')],
      category: recipe[0] && recipe[0][getPath('category')],
      alcoholicOrNot: recipe[0] && recipe[0][getPath('alcoholicOrNot')] === undefined
        ? ''
        : recipe[0] && recipe[0][getPath('alcoholicOrNot')],
      name: recipe[0] && recipe[0][getPath('name')],
      image: recipe[0] && recipe[0][getPath('img')],
      doneDate: actualDate,
      tags: recipe[0] && recipe[0][getPath('tags')]?.split(',') === undefined
        ? [] : recipe[0] && recipe[0][getPath('tags')]?.split(','),
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

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <img
        data-testid="recipe-photo"
        src={ recipe[0] && recipe[0][getPath('img')] }
        alt="Imagem do prato"
        height={ 200 }
      />
      <h2 data-testid="recipe-title">{recipe[0] && recipe[0][getPath('name')]}</h2>
      <h3>Ingredientes:</h3>
      {
      ingredientsWithMeasures.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          style={ {
            textDecoration: checkedIngredients[mealsOrDrinks][id as string]
              && checkedIngredients[mealsOrDrinks][id as string].includes(ingredient)
              ? 'line-through solid rgb(0, 0, 0)'
              : 'none',
          } }
        >
          <input
            type="checkbox"
            checked={
              (checkedIngredients[mealsOrDrinks][id as string]
              && checkedIngredients[mealsOrDrinks][id as string].includes(ingredient))
              || false
            }
            onChange={ () => handleCheckedIngredients(ingredient) }
          />
          {ingredient}
        </label>
      ))
    }
      <h4 data-testid="recipe-category">
        {`Categoria: ${recipe[0] && recipe[0][getPath('category')]}`}
      </h4>
      <span data-testid="instructions">
        {`Instruções: ${recipe[0] && recipe[0][getPath('instructions')]}`}
      </span>
      <input
        type="image"
        src={ isFavorite ? isFavoriteImage : notFavoriteImage }
        className="btn-category"
        alt="blackHeartIcon"
        data-testid="favorite-btn"
        onClick={ () => handleClickFavorite() }
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
        disabled={ isDisable }
        onClick={ () => handleClickEndRecipe() }
      />
    </div>
  );
}

export default RecipeInProgress;
