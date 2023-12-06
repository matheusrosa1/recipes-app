import { useContext } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import { Button } from '../../components/Forms/Button';
import shareImage from '../../images/shareIcon.svg';

function DoneRecipes() {
  const { doneRecipes, copyMessage, copyLinkDetail } = useContext(RecipesContext);
  const hrefReplaced = window.location.href.replace('/done-recipes', '');

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
      {doneRecipes && doneRecipes.map((doneRecipe, index) => (
        doneRecipe.type === 'meal'
          ? (
            <div key={ doneRecipe.id }>
              <img
                src={ doneRecipe && doneRecipe.image }
                alt=""
                height={ 200 }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${doneRecipe.nationality} - ${doneRecipe.category}`}
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
              <input
                type="image"
                src={ shareImage }
                className="btn-category"
                alt="blackHeartIcon"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyLinkDetail(
                  `${hrefReplaced}/${doneRecipe.type}s/${doneRecipe.id}`,
                ) }
                style={ { maxWidth: '100%', maxHeight: '100%' } }
              />
              {copyMessage && (
                <p>Link copied!</p>
              )}
              {doneRecipe.tags && doneRecipe.tags.slice(0, 2)
                .map((tag) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ tag }
                  >
                    {tag}
                  </p>
                ))}
            </div>
          )
          : (
            <div key={ doneRecipe.id }>
              <img
                src={ doneRecipe && doneRecipe.image }
                alt=""
                height={ 200 }
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {doneRecipe.alcoholicOrNot}
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
              <input
                type="image"
                src={ shareImage }
                className="btn-category"
                alt="blackHeartIcon"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyLinkDetail(
                  `${hrefReplaced}/${doneRecipe.type}s/${doneRecipe.id}`,
                ) }
                style={ { maxWidth: '100%', maxHeight: '100%' } }
              />
              {copyMessage && (
                <p>Link copied!</p>
              )}
              {doneRecipe.tags && doneRecipe.tags.slice(0, 2)
                .map((tag) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ tag }
                  >
                    {tag}
                  </p>
                ))}
            </div>
          )
      ))}
    </div>
  );
}
export default DoneRecipes;
