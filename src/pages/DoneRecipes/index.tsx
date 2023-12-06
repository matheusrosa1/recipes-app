import { useContext } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import { Button } from '../../components/Forms/Button';

function DoneRecipes() {
  const { doneRecipes, copyLinkDetail, copyMessage } = useContext(RecipesContext);

  return (
    <div>
      <Header tipo="Done Recipes" />
      <h1>Done Recipes</h1>
      <Button
        dataTestId="filter-by-all-btn"
        onClick={ () => console.log('oi') }
        buttonLabel="All"
      />
      <Button
        dataTestId="filter-by-meal-btn"
        onClick={ () => console.log('oi') }
        buttonLabel="Meals"
      />
      <Button
        dataTestId="filter-by-drink-btn"
        onClick={ () => console.log('oi') }
        buttonLabel="Drinks"
      />
      {doneRecipes.map((doneRecipe, index) => (
        <div key={ doneRecipe.id }>
          <img
            src={ doneRecipe.image }
            alt={ doneRecipe.name }
            height={ 200 }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {doneRecipe.category}
          </p>
          <h3
            data-testid={ `${index}-horizontal-name` }
          >
            {doneRecipe.name}
          </h3>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {doneRecipe.doneDate}
          </p>
          <Button
            dataTestId={ `${index}-horizontal-share-btn` }
            buttonLabel="Compartilhar"
            onClick={ () => () => console.log('oi') }
          />
          {copyMessage && (
            <p>Link copied!</p>
          )}
          {doneRecipe.tags && doneRecipe.tags.map((tag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tag }
            >
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
export default DoneRecipes;
