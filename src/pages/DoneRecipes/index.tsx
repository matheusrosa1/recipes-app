import { useContext, useState } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import { Button } from '../../components/Forms/Button';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from './doneRecipes.module.css';
import drinkAllIcon from '../../images/🦆 icon _fast food outline_.png';
import mealIcon from '../../images/icone-prato.svg';
import Footer from '../../components/Footer';
import drinkIcon from '../../images/icone-prato (1).svg';

function DoneRecipes() {
  const { doneRecipes, copyMessage, isFavorite } = useContext(RecipesContext);
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState(doneRecipes);

  const handleClickFilter = (filter: string) => {
    switch (filter) {
      case 'all':
        setDoneRecipesFiltered(doneRecipes);
        break;
      case 'meals':
        setDoneRecipesFiltered(doneRecipes.filter((recipe) => recipe.type === 'meal'));
        break;
      case 'drinks':
        setDoneRecipesFiltered(doneRecipes.filter((recipe) => recipe.type === 'drink'));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header tipo="Done Recipes" />
      {/*       <div className={ styles.body }> */}
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
          {doneRecipesFiltered && doneRecipesFiltered.map((doneRecipe, index) => (
            <div
              key={ index }
              className={ styles.RecipeItem }
            >
              <RecipeCard
                recipe={ doneRecipe }
                index={ index }
                copyMessage={ copyMessage }
                typeRecipe="done"
              />
            </div>
          ))}
        </div>
      </div>
      {/*       </div> */}
      <Footer />
    </>
  );
}
export default DoneRecipes;
