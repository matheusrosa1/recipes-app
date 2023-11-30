import { createContext } from 'react';
import { RecipeType } from '../components/types';

export type RecipesContextType = {
  favoritesRecipes: RecipeType[],
  setFavoritesRecipes: (data: RecipeType[]) => void,
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
