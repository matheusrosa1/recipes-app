import { createContext } from 'react';
import { FavoriteRecipeType, RecipeType } from '../components/types';

export type RecipesContextType = {
  favoritesRecipes: RecipeType[],
  addFavoriteRecipe: (recipe: FavoriteRecipeType) => void,
  isFavorite: boolean,
  setIsFavorite: (value: boolean) => void,
  recipe: RecipeType[],
  setRecipe: (data: RecipeType[]) => void,
  copyMessage: boolean,
  copyLinkDetail: (href: string) => void,
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
