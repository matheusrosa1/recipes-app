import { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { Button } from '../../components/Forms/Button';

function FavoriteRecipes() {
  const { favoritesRecipes, copyMessage } = useContext(RecipesContext);
  const [favoritesRecipeFiltered,
    setFavoritesRecipeFiltered] = useState(favoritesRecipes);
  useEffect(() => {
    setFavoritesRecipeFiltered(favoritesRecipes);
  }, [favoritesRecipes]);

  useEffect(
    () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
    },
    [favoritesRecipes],
  );

  const handleClickFilter = (filter: string) => {
    switch (filter) {
      case 'all':
        setFavoritesRecipeFiltered(favoritesRecipes);
        break;
      case 'meals':
        setFavoritesRecipeFiltered(favoritesRecipes
          .filter((recipe) => recipe.type === 'meal'));
        break;
      case 'drinks':
        setFavoritesRecipeFiltered(favoritesRecipes
          .filter((recipe) => recipe.type === 'drink'));
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Header tipo="Favorite Recipes" />
      <h1>Meals</h1>
      <Button
        dataTestId="filter-by-all-btn"
        onClick={ () => handleClickFilter('all') }
        buttonLabel="All"
      />
      <Button
        dataTestId="filter-by-meal-btn"
        onClick={ () => handleClickFilter('meals') }
        buttonLabel="Meals"
      />
      <Button
        dataTestId="filter-by-drink-btn"
        onClick={ () => handleClickFilter('drinks') }
        buttonLabel="Drinks"
      />
      {favoritesRecipeFiltered && favoritesRecipeFiltered.map((favoriteRecipe, index) => (
        <div key={ index }>
          <RecipeCard
            recipe={ favoriteRecipe }
            index={ index }
            copyMessage={ copyMessage }
            typeRecipe="favorite"
          />
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;
