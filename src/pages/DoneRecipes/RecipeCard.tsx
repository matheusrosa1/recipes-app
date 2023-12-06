import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shareImage from '../../images/shareIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import { DoneRecipeType } from '../../types';

export type RecipeCardProps = {
  doneRecipe: DoneRecipeType,
  index: number,
  copyMessage: boolean,
};

function RecipeCard({ doneRecipe, index, copyMessage }: RecipeCardProps) {
  const { copyLinkDetail } = useContext(RecipesContext);
  const localHost = window.location.href.replace('/done-recipes', '');
  const navigate = useNavigate();

  return (
    <div key={ doneRecipe.id }>
      <div
        onClick={ () => navigate(`/${doneRecipe.type}s/${doneRecipe.id}`) }
        aria-hidden="true"
        role="link"
        tabIndex={ 0 }
      >
        <img
          src={ doneRecipe && doneRecipe.image }
          alt=""
          height={ 200 }
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {doneRecipe.type === 'meal'
          ? `${doneRecipe.nationality} - ${doneRecipe.category}`
          : doneRecipe.alcoholicOrNot}
      </p>
      <h3
        data-testid={ `${index}-horizontal-name` }
        onClick={ () => navigate(`/${doneRecipe.type}s/${doneRecipe.id}`) }
        aria-hidden="true"
      >
        {doneRecipe.name}
      </h3>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
      <input
        type="image"
        src={ shareImage }
        className="btn-category"
        alt="blackHeartIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyLinkDetail(
          `${localHost}/${doneRecipe.type}s/${doneRecipe.id}`,
        ) }
        style={ { maxWidth: '100%', maxHeight: '100%' } }
      />
      {copyMessage && <p>Link copied!</p>}
      {doneRecipe.tags
        && doneRecipe.tags.slice(0, 2).map((tag) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
            {tag}
          </p>
        ))}
    </div>
  );
}

export default RecipeCard;
