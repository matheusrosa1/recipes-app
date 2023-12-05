import { useContext, useState } from 'react';
import { FavoriteRecipeType, RecipeType } from '../types';
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

  const value = {
    getRecipes,
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
