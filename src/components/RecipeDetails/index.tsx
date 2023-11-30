import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchRecipes, getRecipesById } from '../../services/fetchAPI';
import { ExtendedRecipeType, RecipeType } from '../types';
import { Buttom } from '../Forms/Button';
import RecipesContext from '../../context/RecipesContext';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [recommendations, setRecommendations] = useState([]);
  const [btnTitle, setBtnTitle] = useState('Start Recipe');
  const [copyMessage, setCopyMessage] = useState(false);
  const { favoritesRecipes, setFavoritesRecipes } = useContext(RecipesContext);

  const getRecipes = async () => {
    try {
      const recipeById = await getRecipesById(location.pathname, id as string);
      setRecipe(recipeById);
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

  // Função que inclui o recipe no localStorage como concluído [EM DESENVOLVIMENTO]
  const handleClickStartRecipe = () => {
    navigate(`${location.pathname}/in-progress`);
  };

  useEffect(() => {
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
  const alcoholicOrNot = location.pathname === `/meals/${id}` ? '' : 'strAlcoholic';
  const nationality = location.pathname === `/meals/${id}` ? 'strArea' : '';
  const type = location.pathname === `/meals/${id}` ? 'meal' : 'drink';

  const copyLinkDetail = () => {
    window.navigator.clipboard.writeText(window.location.href);
    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 2000);
  };

  const handleClickFavorite = () => {
    const favoriteRecipeObject: ExtendedRecipeType = {
      id,
      type,
      nationality: recipe[0][nationality] === undefined ? '' : recipe[0][nationality],
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0][alcoholicOrNot] === undefined
        ? '' : recipe[0][alcoholicOrNot],
      name: recipe[0][name],
      image: recipe[0][img],
    };
    setFavoritesRecipes([...favoritesRecipes, favoriteRecipeObject]);
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
  }, [favoritesRecipes]);

  return (
    <div>
      {recipe.map((recipeDetail: any, index) => (
        <div key={ recipeDetail[recipeId] }>
          <img
            data-testid="recipe-photo"
            src={ recipeDetail[img] }
            alt={ recipeDetail[name] }
            width="350px"
          />
          <h2
            data-testid="recipe-title"
          >
            {recipeDetail[name]}

          </h2>
          {location.pathname === `/meals/${id}` ? (
            <p data-testid="recipe-category">
              {recipeDetail.strCategory}
            </p>
          ) : (
            <p data-testid="recipe-category">
              {recipeDetail.strAlcoholic}
            </p>
          ) }
          <p
            data-testid="instructions"
          >
            {recipeDetail.strInstructions}

          </p>
          <h3>Ingredients:</h3>
          <ul
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {renderIngredientsAndMeasures(recipeDetail)}
          </ul>
          {location.pathname === `/meals/${id}` && (
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
          )}

        </div>
      ))}
      <h3>Recommendations:</h3>
      <div className="carrossel-container">
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
        type="button"
        id="btn-start-recipe"
        data-testid="start-recipe-btn"
        className="btn-start-recipe btn-category"
        onClick={ () => handleClickStartRecipe() }
      >
        {btnTitle}
      </button>
      <Buttom
        dataTestId="share-btn"
        buttonLabel="Compartilhar"
        onClick={ () => copyLinkDetail() }
      />
      <Buttom
        dataTestId="favorite-btn"
        buttonLabel="Favoritar"
        onClick={ () => handleClickFavorite() }
      />
      {copyMessage && (
        <p>Link copied!</p>
      )}
    </div>
  );
}

export default RecipeDetails;
