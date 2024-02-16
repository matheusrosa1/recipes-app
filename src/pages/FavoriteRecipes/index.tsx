import { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { Button } from '../../components/Forms/Button';
import styles from './favoriteRecipes.module.css';
import drinkIcon from '../../images/icone-prato (1).svg';
import drinkAllIcon from '../../images/🦆 icon _fast food outline_.png';
import mealIcon from '../../images/icone-prato.svg';

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
    <>
      <Header tipo="Favorite Recipes" />
      <div className={ styles.container }>
        <div className={ styles.buttonsContainer }>
          <button
            className={ styles.buttons }
            data-testid="filter-by-all-btn"
            onClick={ () => handleClickFilter('all') }
          >
            <img
              src={ drinkAllIcon }
              alt="all"
            />
            <p>All</p>
          </button>
          <button
            className={ styles.buttons }
            data-testid="filter-by-meal-btn"
            onClick={ () => handleClickFilter('meals') }
          >
            <img
              src={ mealIcon }
              alt="drink"
              data-testid="meals-bottom-btn"
            />
            <p>Meals</p>
          </button>
          <button
            className={ styles.buttonDrink }
            data-testid="filter-by-drink-btn"
            onClick={ () => handleClickFilter('drinks') }
          >
            <img
              src={ drinkIcon }
              alt="drink"
            />
            <p>Drinks</p>
          </button>
        </div>
        <div className={ styles.recipesContainer }>
          {favoritesRecipeFiltered
          && favoritesRecipeFiltered.map((favoriteRecipe, index) => (
            <div
              key={ index }
              className={ styles.RecipeItem }
            >
              <RecipeCard
                recipe={ favoriteRecipe }
                index={ index }
                copyMessage={ copyMessage }
                typeRecipe="favorite"
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
export default FavoriteRecipes;
