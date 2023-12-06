import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import { Button } from '../../components/Forms/Button';
import shareImage from '../../images/shareIcon.svg';
import RecipeCard from './RecipeCard';

function DoneRecipes() {
  const { doneRecipes, copyMessage, copyLinkDetail } = useContext(RecipesContext);
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState(doneRecipes);
  const localHost = window.location.href.replace('/done-recipes', '');
  const navigate = useNavigate();

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
    <div>
      <Header tipo="Done Recipes" />
      <h1>Done Recipes</h1>
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
      {doneRecipesFiltered && doneRecipesFiltered.map((doneRecipe, index) => (
        <div key={ index }>
          <RecipeCard
            doneRecipe={ doneRecipe }
            index={ index }
            copyMessage={ copyMessage }
          />
        </div>
      ))}
    </div>
  );
}
export default DoneRecipes;
