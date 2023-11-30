import { createContext } from 'react';
import { FavoriteRecipeType, RecipeType } from '../components/types';

export type RecipesContextType = {
  favoritesRecipes: RecipeType[],
  addFavoriteRecipe: (recipe: FavoriteRecipeType) => void,
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
