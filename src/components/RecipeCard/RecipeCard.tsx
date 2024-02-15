import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shareImage from '../../images/shareIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import { DoneRecipeType, RecipeType } from '../../types';
import isFavoriteImage from '../../images/blackHeartIcon.svg';
import notFavoriteImage from '../../images/whiteHeartIcon.svg';
import styles from './recipeCard.module.css';

export type RecipeCardProps = {
  recipe: DoneRecipeType | RecipeType,
  index: number,
  copyMessage: boolean,
  typeRecipe: string,
};

function RecipeCard({ recipe, index, copyMessage, typeRecipe }: RecipeCardProps) {
  const { copyLinkDetail, handleClickFavorite, isFavorite } = useContext(RecipesContext);
  const navigate = useNavigate();
  /*   const isFavorite = useContext(RecipesContext); */

  const path = window.location.href.split('/');
  return (
    <div
      key={ recipe.id }
      className={ styles.recipeCard }
    >
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
      <div className={ styles.infos }>
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
        {/*      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p> */}
        <div className={ styles.buttons }>
          <input
            type="image"
            src={ shareImage }
            className="btn-category"
            alt="blackHeartIcon"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyLinkDetail(
              `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}`,
            ) }
            style={ { maxWidth: '100%', maxHeight: '100%' } }
          />
          {/*           {copyMessage && <p>Link copied!</p>} */}
          {/*           {Array.isArray(recipe.tags)
        && typeRecipe === 'done' && recipe.tags.slice(0, 2).map((tag: any) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
            {tag}
          </p>
          ))} */}
          {/*           <input
            type="image"
            src={ isFavorite ? isFavoriteImage : notFavoriteImage }
            className="btn-category"
            alt="blackHeartIcon"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => handleClickFavorite(
              recipe.id as string,
              recipe.type as string,
              recipe.type === 'meal' ? 'meals' : 'cocktails',
            ) }
            style={ { maxWidth: '100%', maxHeight: '100%' } }
          /> */}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
