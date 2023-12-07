import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import shareImage from '../../images/shareIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import { DoneRecipeType, FavoriteRecipeType, RecipeType } from '../../types';

export type RecipeCardProps = {
  recipe: DoneRecipeType | RecipeType,
  index: number,
  copyMessage: boolean,
  typeRecipe: string,
};

function RecipeCard({ recipe, index, copyMessage, typeRecipe }: RecipeCardProps) {
  const { copyLinkDetail } = useContext(RecipesContext);
  const localHost = window.location.href.replace('/done-recipes', '');
  const navigate = useNavigate();

  return (
    <div key={ recipe.id }>
      <div
        onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
        aria-hidden="true"
        role="link"
        tabIndex={ 0 }
      >
        <img
          src={ recipe && recipe.image }
          alt=""
          height={ 200 }
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'meal'
          ? `${recipe.nationality} - ${recipe.category}`
          : recipe.alcoholicOrNot}
      </p>
      <h3
        data-testid={ `${index}-horizontal-name` }
        onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
        aria-hidden="true"
      >
        {recipe.name}
      </h3>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      <input
        type="image"
        src={ shareImage }
        className="btn-category"
        alt="blackHeartIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyLinkDetail(
          `${localHost}/${recipe.type}s/${recipe.id}`,
        ) }
        style={ { maxWidth: '100%', maxHeight: '100%' } }
      />
      {copyMessage && <p>Link copied!</p>}
      {Array.isArray(recipe.tags)
        && typeRecipe === 'done' && recipe.tags.slice(0, 2).map((tag: any) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
            {tag}
          </p>
      ))}
    </div>
  );
}

export default RecipeCard;
