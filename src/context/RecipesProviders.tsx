import { useState } from 'react';
import { FavoriteRecipeType, RecipeType } from '../components/types';
import RecipesContext from './RecipesContext';

type RecipesProviderProps = {
  children: React.ReactNode
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const [favoritesRecipes, setFavoritesRecipes] = useState<RecipeType[]>([]);

  const addFavoriteRecipe = (recipe: FavoriteRecipeType) => {
    setFavoritesRecipes([...favoritesRecipes, recipe]);
  };

  const value = {
    favoritesRecipes,
    addFavoriteRecipe,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
