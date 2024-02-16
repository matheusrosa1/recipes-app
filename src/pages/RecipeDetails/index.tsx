import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchRecipes, fetchRecipesById } from '../../services/fetchAPI';
import { FavoriteRecipeType, RecipeType } from '../../types';
import RecipesContext from '../../context/RecipesContext';
import isFavoriteImage from '../../images/like.svg';
import notFavoriteImage from '../../images/dislike.png';
import styles from './recipeDetails.module.css';
import mealIcon from '../../images/icone-prato.svg';
import drinkIcon from '../../images/icone-prato (1).svg';
import shareButton from '../../images/Share.svg';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [btnTitle, setBtnTitle] = useState('Start Recipe');

  const {
    favoritesRecipes,
    isFavorite,
    setIsFavorite,
    recipe,
    setRecipe,
    copyLinkDetail,
    handleClickFavorite,
  } = useContext(RecipesContext);

  const mealsOrDrinks = location.pathname.split('/')[1];

  const getRecipes = async () => {
    try {
      const recipeById = await fetchRecipesById(mealsOrDrinks, id as string);
      setRecipe(recipeById);

      localStorage.setItem('recipe', JSON.stringify(recipeById));
    } catch (error) {
      console.log(error);
    }
  };

  const getRecommendations = async () => {
    try {
      const type = location.pathname === `/meals/${id}`
        ? '/drinks' : '/meals';
      const newRecommendations = await fetchRecipes(type);
      setRecommendations(newRecommendations);
    } catch (error) {
      console.log(error);
    }
  };

  const mealOrDrink = location.pathname.split('/')[1];

  const handleClickStartRecipe = () => {
    navigate(`${location.pathname}/in-progress`);
  };

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
    if (getFavoriteRecipes) {
      const favoriteRecipesIds = getFavoriteRecipes.map(
        (recipeMap: FavoriteRecipeType) => recipeMap.id,
      );
      console.log(favoriteRecipesIds);
      if (favoriteRecipesIds.includes(id as string)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
    getRecommendations();
    getRecipes();

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')!);
    if (inProgressRecipes && Object.keys(
      inProgressRecipes[mealOrDrink],
    ).includes(id as string)
    ) {
      setBtnTitle('Continue Recipe');
    }
  }, [location.pathname, id]);

  const renderIngredientsAndMeasures = (recipeDetail: RecipeType) => {
    const ingredients = Object.keys(recipeDetail)
      .filter((key) => key.includes('strIngredient') && recipeDetail[key]);
    const measures = Object.keys(recipeDetail)
      .filter((key) => key.includes('strMeasure') && recipeDetail[key]);
    return ingredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${recipeDetail[ingredient]} - ${recipeDetail[measures[index]]}`}
      </li>
    ));
  };

  const recipeId = location.pathname === `/meals/${id}` ? 'idMeal' : 'idDrink';
  const img = location.pathname === `/meals/${id}` ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === `/meals/${id}` ? 'strMeal' : 'strDrink';
  const type = location.pathname === `/meals/${id}` ? 'meal' : 'drink';

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
  }, [favoritesRecipes]);

  return (
    <div className={ styles.body }>
      <div className={ styles.container }>
        <div className={ styles.iconMealOrDrink }>
          <img
            src={ location.pathname === `/meals/${id}`
              ? mealIcon : drinkIcon }
            alt="Icon Drink or Meal"
          />
        </div>
        <div className={ styles.buttons }>
          <button
            className={ styles.shareButton }
            data-testid="share-btn"
            id="btn-share"
            onClick={ () => copyLinkDetail(window.location.href) }
          >
            <img src={ shareButton } alt="Share Button" />

          </button>
          <input
            className={ styles.favoriteImage }
            type="image"
            src={ isFavorite ? isFavoriteImage : notFavoriteImage }
            alt="blackHeartIcon"
            data-testid="favorite-btn"
            onClick={ () => handleClickFavorite(id as string, type, mealOrDrink) }
            style={ { maxWidth: '100%', maxHeight: '100%' } }
          />
        </div>
        {recipe && recipe.map((recipeDetail: RecipeType, index) => (
          <div
            key={ recipeDetail[recipeId] }
            className={ styles.recipeContainer }
          >
            <div className={ styles.componente }>
              <img
                className={ styles.imageRecipe }
                data-testid="recipe-photo"
                src={ recipeDetail[img] }
                alt={ recipeDetail[name] }
                width="350px"
              />
              <h2
                className={ styles.title }
                data-testid="recipe-title"
              >
                {recipeDetail[name]}
              </h2>
            </div>
            {location.pathname === `/meals/${id}` ? (
              <p
                data-testid="recipe-category"
                className={ styles.category }
              >
                {recipeDetail.strCategory}
              </p>
            ) : (
              <p
                data-testid="recipe-category"
                className={ styles.category }
              >
                {recipeDetail.strAlcoholic}
              </p>
            ) }
            <h3>Ingredients</h3>
            <div className={ styles.ingredientsContainer }>
              <div className={ styles.ingredients }>
                <ul
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <p>{renderIngredientsAndMeasures(recipeDetail)}</p>
                </ul>
              </div>
            </div>
            <h3>Instructions</h3>
            <div className={ styles.instructionsContainer }>
              <div className={ styles.instructions }>
                <p
                  data-testid="instructions"
                >
                  {recipeDetail.strInstructions}

                </p>
              </div>
            </div>
            {location.pathname === `/meals/${id}` && (
              <div className={ styles.videoCountainer }>
                <h3>Video</h3>
                <iframe
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ recipeDetail.strYoutube }
                  title="YouTube video player"
                  allow="accelerometer;
                     clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

          </div>
        ))}
        <h3>Recommendations</h3>
        <div className={ styles.carrosselContainer }>
          {recommendations.slice(0, 6).map((recommendation: any, index2) => (
            <div
              key={ index2 }
            >
              <img
                data-testid={ `${index2}-recommendation-card` }
                src={ recommendation.strDrinkThumb || recommendation.strMealThumb }
                alt={ recommendation.strDrink || recommendation.strMeal }
                width="150px"
              />
              <p
                data-testid={ `${index2}-recommendation-title` }
              >
                {recommendation.strDrink || recommendation.strMeal}
              </p>
            </div>
          ))}
        </div>

        <button
          className={ styles.startButton }
          type="button"
          id="btn-start-recipe"
          data-testid="start-recipe-btn"
          onClick={ () => handleClickStartRecipe() }
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
