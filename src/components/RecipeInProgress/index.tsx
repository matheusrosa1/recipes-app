import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import isFavoriteImage from '../../images/blackHeartIcon.svg';
import notFavoriteImage from '../../images/whiteHeartIcon.svg';
import { Button } from '../Forms/Button';
import { fetchRecipesById } from '../../services/fetchAPI';
import {
  CheckedIngredientsType,
  DoneRecipeType,
  FavoriteRecipeType,
  RecipeType,
} from '../types';

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
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);

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
    // setRecipe,
    getRecipes,
    addFavoriteRecipe,
    isFavorite,
    setIsFavorite,
    copyMessage,
    copyLinkDetail,
    favoritesRecipes,
  } = useContext(RecipesContext);

  const mealsOrDrinks = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const hrefReplaced = window.location.href.replace('/in-progress', '');

  const imgPath = mealsOrDrinks === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const namePath = mealsOrDrinks === 'meals' ? 'strMeal' : 'strDrink';
  const categoryPath = 'strCategory';
  const instructionsPath = mealsOrDrinks === 'meals' ? 'strInstructions'
    : 'strInstructions';
  const alcoholicOrNotPath = mealsOrDrinks === 'meals' ? '' : 'strAlcoholic';
  const nationalityPath = mealsOrDrinks === 'meals' ? 'strArea' : '';
  const strTagsPath = mealsOrDrinks === 'meals' ? 'strTags' : '';

  const img = recipe[0] && recipe[0][imgPath];
  const name = recipe[0] && recipe[0][namePath];
  const category = recipe[0] && recipe[0][categoryPath];
  const instructions = recipe[0] && recipe[0][instructionsPath];
  const alcoholicOrNot = recipe[0] && recipe[0][alcoholicOrNotPath];
  const type = recipe[0] && mealsOrDrinks === 'meals' ? 'meal' : 'drink';
  const nationality = recipe[0] && recipe[0][nationalityPath];
  const tags = recipe[0] && recipe[0][strTagsPath]?.split(',');

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
    if (getFavoriteRecipes) {
      const favoriteRecipesIds = getFavoriteRecipes.map(
        (recipeMap: FavoriteRecipeType) => recipeMap.id,
      );
      if (favoriteRecipesIds.includes(id as string)) { setIsFavorite(true); }
    }
    getRecipes(mealsOrDrinks, id as string);
  }, []);

  useEffect(() => {
    if (recipe[0] === undefined) return;
    const ingredients = Object.keys(recipe[0]).filter(
      (key) => key.includes('strIngredient') && recipe[0][key],
    );
    const measures = Object.keys(recipe[0]).filter(
      (key) => key.includes('strMeasure') && recipe[0][key],
    );
    const ingredientsAndMeasures = ingredients.map((ingredient, index) => (
      `${recipe[0][ingredient]} - ${[recipe[0][measures[index]]]}`));

    setIngredientsWithMeasures(ingredientsAndMeasures);
  }, [recipe]);

  const handleClickFavorite = () => {
    const favoriteRecipeObject: FavoriteRecipeType = {
      id,
      type,
      nationality: nationality === undefined ? '' : nationality,
      category,
      alcoholicOrNot: alcoholicOrNot === undefined ? '' : alcoholicOrNot,
      name,
      image: img,
    };
    addFavoriteRecipe(favoriteRecipeObject);
  };

  // Pega a lista de receitas favoritas do localStorage
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
      nationality: nationality === undefined ? '' : nationality,
      category,
      alcoholicOrNot: alcoholicOrNot === undefined ? '' : alcoholicOrNot,
      name,
      image: img,
      doneDate: actualDate,
      tags: tags === undefined ? [] : tags,
    };
    setDoneRecipes([...doneRecipes, doneRecipeObject]);
  };

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    if (doneRecipes.length > 0) {
      navigate('/done-recipes');
    }
  }, [doneRecipes]);

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <img
        data-testid="recipe-photo"
        src={ img }
        alt="Imagem do prato"
        height={ 200 }
      />
      <h2 data-testid="recipe-title">{name}</h2>
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
      <h4 data-testid="recipe-category">{`Categoria: ${category}`}</h4>
      <span data-testid="instructions">{`Instruções: ${instructions}`}</span>
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
