import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { FavoriteRecipeType, RecipeType } from '../types';

export const useGetFavoritesAndRecipes = (path: string, id: string) => {
  const {
    getRecipes,
    setIsFavorite,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
    if (getFavoriteRecipes) {
      const favoriteRecipesIds = getFavoriteRecipes.map(
        (recipeMap: FavoriteRecipeType) => recipeMap.id,
      );
      if (favoriteRecipesIds.includes(id as string)) { setIsFavorite(true); }
    }
    getRecipes(path, id as string);
  }, []);
};

export const useGetIngredientsAndMeasures = (
  recipe: RecipeType[],
  setIngredientsWithMeasures: any,
) => {
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
};
