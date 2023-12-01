import { useState } from 'react';
import { FavoriteRecipeType, RecipeType } from '../components/types';
import RecipesContext from './RecipesContext';

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

  const addFavoriteRecipe = (recipe: FavoriteRecipeType) => {
    setIsFavorite((prevState) => !prevState);
    setFavoritesRecipes([...favoritesRecipes, recipe]);
  };

  const value = {
    favoritesRecipes,
    addFavoriteRecipe,
    isFavorite,
    setIsFavorite,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
