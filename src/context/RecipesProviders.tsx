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

  const [recipe, setRecipe] = useState<RecipeType[]>([]);

  const [copyMessage, setCopyMessage] = useState(false);

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

  const value = {
    favoritesRecipes,
    addFavoriteRecipe,
    isFavorite,
    setIsFavorite,
    recipe,
    setRecipe,
    copyMessage,
    copyLinkDetail,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
