import { useState } from 'react';
import { RecipeType } from '../components/types';
import RecipesContext from './RecipesContext';

type RecipesProviderProps = {
  children: React.ReactNode
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const [favoritesRecipes, setFavoritesRecipes] = useState<RecipeType[]>([]);

  const value = {
    favoritesRecipes,
    setFavoritesRecipes,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
