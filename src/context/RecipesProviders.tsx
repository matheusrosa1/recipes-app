import { useState } from 'react';
import { DoneRecipeType, FavoriteRecipeType, RecipeType } from '../types';
import RecipesContext from './RecipesContext';
import { fetchRecipesById } from '../services/fetchAPI';

type RecipesProviderProps = {
  children: React.ReactNode
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const [favoritesRecipes, setFavoritesRecipes] = useState<RecipeType[]>(
    localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')!)
      : [],
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>(
    localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')!)
      : [],
  );

  const addDoneRecipes = (doneRecipeProp: DoneRecipeType) => {
    setDoneRecipes([...doneRecipes, doneRecipeProp]);
  };

  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [copyMessage, setCopyMessage] = useState(false);

  const getRecipes = async (path: string, id: string) => {
    try {
      const recipeById = await fetchRecipesById(path, id);
      setRecipe(recipeById);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLinkDetail = (href: string) => {
    window.navigator.clipboard.writeText(href);
    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 2000);
  };

  const addFavoriteRecipe = (recipeProp: FavoriteRecipeType) => {
    setIsFavorite((prevState) => !prevState);
    setFavoritesRecipes([...favoritesRecipes, recipeProp]);
  };

  const getPath = (field: string, mealsOrDrinks: string) => {
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

  const handleClickFavorite = (id: string, type: string, mealsOrDrinks: string) => {
    const favoriteRecipeObject: FavoriteRecipeType = {
      id,
      type,
      nationality: recipe[0]
      && recipe[0][getPath('nationality', mealsOrDrinks)] === undefined
        ? '' : recipe[0]
        && recipe[0][getPath('nationality', mealsOrDrinks)],
      category: recipe[0]
      && recipe[0][getPath('category', mealsOrDrinks)],
      alcoholicOrNot: recipe[0]
      && recipe[0][getPath('alcoholicOrNot', mealsOrDrinks)] === undefined
        ? '' : recipe[0] && recipe[0][getPath('alcoholicOrNot', mealsOrDrinks)],
      name: recipe[0]
      && recipe[0][getPath('name', mealsOrDrinks)],
      image: recipe[0]
      && recipe[0][getPath('img', mealsOrDrinks)],
    };
    addFavoriteRecipe(favoriteRecipeObject);
  };

  const value = {
    getRecipes,
    favoritesRecipes,
    /*   addFavoriteRecipe, */
    isFavorite,
    handleClickFavorite,
    setIsFavorite,
    recipe,
    setRecipe,
    copyMessage,
    copyLinkDetail,
    doneRecipes,
    addDoneRecipes,
    getPath,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
