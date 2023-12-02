import { useContext, useEffect, useState } from "react";
import RecipesContext from "../../context/RecipesContext";
import { useLocation, useParams } from "react-router-dom";
import isFavoriteImage from '../../images/blackHeartIcon.svg';
import notFavoriteImage from '../../images/whiteHeartIcon.svg';
import { CheckedIngredientsType, FavoriteRecipeType, RecipeType } from "../types";
import { Button } from "../Forms/Button";
import { getRecipesById } from "../../services/fetchAPI";

function RecipeInProgress() {
  const { id } = useParams<string>();
  const location = useLocation();
  const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<CheckedIngredientsType>(
    localStorage.getItem('inProgressRecipes') 
    ? JSON.parse(localStorage.getItem('inProgressRecipes')!) 
    : {
      meals: {},
      drinks: {},
    });
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [list, setList] = useState<string[]>(
    localStorage.getItem('list') 
    ? JSON.parse(localStorage.getItem('list')!) 
    : []
  );

  const {
    // recipe,
    // setRecipe,
    addFavoriteRecipe,
    isFavorite,
    setIsFavorite,
    copyMessage,
    copyLinkDetail,
    favoritesRecipes,
  } = useContext(RecipesContext);  

  const mealsOrDrinks = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const hrefReplaced = window.location.href.replace('/in-progress', '');

  // Variáveis para acessar os dados da receita
  const imgPath = mealsOrDrinks === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const namePath = mealsOrDrinks === 'meals' ? 'strMeal' : 'strDrink';
  const categoryPath = 'strCategory';
  const instructionsPath = mealsOrDrinks === 'meals' ? 'strInstructions' : 'strInstructions';
  const alcoholicOrNotPath = mealsOrDrinks === 'meals' ? '' : 'strAlcoholic';
  const nationalityPath = mealsOrDrinks === 'meals' ? 'strArea' : '';
  
  const img = recipe[0] && recipe[0][imgPath];
  const name = recipe[0] && recipe[0][namePath];
  const category = recipe[0] && recipe[0][categoryPath];
  const instructions = recipe[0] && recipe[0][instructionsPath];
  const alcoholicOrNot = recipe[0] && recipe[0][alcoholicOrNotPath];
  const type = recipe[0] && mealsOrDrinks === 'meals' ? 'meal' : 'drink';
  const nationality = recipe[0] && recipe[0][nationalityPath];


  const getRecipes = async () => {
    try {
      const recipeById = await getRecipesById(mealsOrDrinks, id as string);
      setRecipe(recipeById);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
      if (getFavoriteRecipes) {
        const favoriteRecipesIds = getFavoriteRecipes.map(
        (recipeMap: FavoriteRecipeType) => recipeMap.id,
      );
      if (favoriteRecipesIds.includes(id as string)) {
        setIsFavorite(true);
      }
    }
    getRecipes();    
  }, []);

  useEffect(() => {
    if (recipe[0] === undefined) return;    

    const ingredients = Object.keys(recipe[0]).filter(
      (key) => key.includes('strIngredient') && recipe[0][key]
    );
    const measures = Object.keys(recipe[0]).filter(
      (key) => key.includes('strMeasure') && recipe[0][key],
    );

    const ingredientsAndMeasures = ingredients.map((ingredient, index) => (
      `${recipe[0][ingredient]} - ${[recipe[0][measures[index]]]}`))
    
    setIngredientsWithMeasures(ingredientsAndMeasures);
    }, [recipe]);

  const handleClickFavorite = () => {
    const favoriteRecipeObject: FavoriteRecipeType = {
        id,
        type,
        nationality: nationality === undefined ? '' : nationality,
        category,
        alcoholicOrNot: alcoholicOrNot === undefined ? '' : alcoholicOrNot,
        name,
        image: img,
      };
    addFavoriteRecipe(favoriteRecipeObject);
  };

  // Pega a lista de receitas favoritas do localStorage
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
  }, [favoritesRecipes]);
  
  
  const handleCheckedIngredients = (ingredient: string) => {
    if (list.includes(ingredient)) {
      const newList = list.filter((item) => item !== ingredient);
      setList(newList);
      return;
    } else {
      setList([...list, ingredient]);
    }
  }

  useEffect(() => {
    setCheckedIngredients({
      ...checkedIngredients,
      [mealsOrDrinks]: {
        ...checkedIngredients[mealsOrDrinks],
        [id as string]: list,
      },
    });
  }, [list]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
    localStorage.setItem('list', JSON.stringify(list));
  }, [checkedIngredients]);
 

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <img
        data-testid="recipe-photo"
        src={ img }
        alt="Imagem do prato"
        height={ 200 }
      />
      <h2 data-testid="recipe-title">{name}</h2>
      <h3>Ingredientes:</h3>
      {
        ingredientsWithMeasures.map((ingredient, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={ {
              textDecoration: checkedIngredients[mealsOrDrinks][id as string]
                && checkedIngredients[mealsOrDrinks][id as string].includes(ingredient)
                ? 'line-through solid rgb(0, 0, 0)'
                : 'none',
            } }
          >
            <input
              type="checkbox"
              checked={ 
                checkedIngredients[mealsOrDrinks][id as string] 
                && checkedIngredients[mealsOrDrinks][id as string].includes(ingredient) || false
              }
              onChange={ () => handleCheckedIngredients(ingredient) }
            />
            {ingredient}
          </label>  
        ))
      }
      <h4 data-testid="recipe-category">{`Categoria: ${category}`}</h4>
      <span data-testid="instructions">{`Instruções: ${instructions}`}</span>
      <input
        type="image"
        src={ isFavorite ? isFavoriteImage : notFavoriteImage }
        className="btn-category"
        alt="blackHeartIcon"
        data-testid="favorite-btn"
        onClick={ () => handleClickFavorite() }
      />
      <Button
        dataTestId="share-btn"
        buttonLabel="Compartilhar"
        onClick={ () => copyLinkDetail(hrefReplaced) }
      />
      {copyMessage && (
        <p>Link copied!</p>
      )}
      <Button
        dataTestId="finish-recipe-btn"
        buttonLabel="Finalizar"
        onClick={ () => {} }
      />
    </div>
  );
}

export default RecipeInProgress;


// import { useContext, useEffect, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { Button } from '../Forms/Button';
// import { FavoriteRecipeType } from '../types';
// import { getRecipesById } from '../../services/fetchAPI';
// import RecipesContext from '../../context/RecipesContext';
// import isFavoriteImage from '../../images/blackHeartIcon.svg';
// import notFavoriteImage from '../../images/whiteHeartIcon.svg';

// function RecipeInProgress() {
//   const { id } = useParams();
//   const location = useLocation();
//   const [checkedIngredients, setCheckedIngredients] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [isEnable, setIsEnable] = useState(false);

//   const { recipe,
//     setRecipe,
//     addFavoriteRecipe,
//     isFavorite,
//     setIsFavorite,
//     copyMessage,
//     copyLinkDetail,
//     favoritesRecipes } = useContext(RecipesContext);

//   // const recipeId = location.pathname === `/meals/${id}/in-progress`
//   //   ? 'idMeal' : 'idDrink';

//   const pathId = location.pathname === `/meals/${id}/in-progress`
//     ? `/meals/${id}`
//     : `/drinks/${id}`;

//   const localStorageKey: string = 'inProgressRecipes';

//   const getRecipes = async () => {
//     try {
//       const recipeById = await getRecipesById(pathId, id as string);
//       setRecipe(recipeById);
//       const storedInProgressRecipes: {
//         [key: string]: { [key: string]: boolean } } = JSON.parse(localStorage
//         .getItem(localStorageKey) || '{}');
//       if (id) {
//         setCheckedIngredients(storedInProgressRecipes[id] || {});
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCheckboxChange = (index: number) => {
//     setCheckedIngredients((prevCheckedIngredients) => {
//       const updatedIngredients = {
//         ...prevCheckedIngredients,
//         [index]: !prevCheckedIngredients[index],
//       };
//       // Save to localStorage
//       const storedInProgressRecipes = JSON
//         .parse(localStorage.getItem(localStorageKey) || '{}');
//       if (id) {
//         if (pathId === `/meals/${id}`) {
//           localStorage.setItem(
//             localStorageKey,
//             JSON.stringify({
//               ...storedInProgressRecipes,
//               meals: {
//                 ...storedInProgressRecipes.meals,
//                 [id]: updatedIngredients,
//               },
//             }),
//           );
//         } else {
//           localStorage.setItem(
//             localStorageKey,
//             JSON.stringify({
//               ...storedInProgressRecipes,
//               drinks: {
//                 ...storedInProgressRecipes.drinks,
//                 [id]: updatedIngredients,
//               },
//             }),
//           );
//         }
//       }

//       return updatedIngredients;
//     });
//   };

//   const renderIngredientsAndMeasures = () => {
//     if (!recipe[0]) return null;
//     const ingredients = Object.keys(recipe[0]).filter(
//       (key) => key.includes('strIngredient') && recipe[0][key],
//     );
//     const measures = Object.keys(recipe[0]).filter(
//       (key) => key.includes('strMeasure') && recipe[0][key],
//     );

//     return ingredients.map((ingredient, index) => (
//       <label
//         key={ index }
//         data-testid={ `${index}-ingredient-step` }
//         style={ {
//           textDecoration: checkedIngredients[index]
//             ? 'line-through solid rgb(0, 0, 0)'
//             : 'none',
//         } }
//       >
//         <input
//           type="checkbox"
//           checked={ checkedIngredients[index] || false }
//           onChange={ () => handleCheckboxChange(index) }
//         />
//         {`${recipe[0][ingredient]} - ${[recipe[0][measures[index]]]}`}
//       </label>
//     ));
//   };

//   /*   const recipeId = location.pathname === `/meals/${id}` ? 'idMeal' : 'idDrink'; */
//   const imgPath = location.pathname === `/meals/${id}/in-progress`
//     ? 'strMealThumb' : 'strDrinkThumb';
//   const name = location.pathname === `/meals/${id}/in-progress` ? 'strMeal' : 'strDrink';
//   const alcoholicOrNot = location.pathname === `/meals/${id}/in-progress`
//     ? '' : 'strAlcoholic';
//   const nationality = location.pathname === `/meals/${id}/in-progress` ? 'strArea' : '';
//   const type = location.pathname === `/meals/${id}/in-progress`
//     ? 'meal' : 'drink';

//   const handleClickFavorite = () => {
//     const favoriteRecipeObject: FavoriteRecipeType = {
//       id,
//       type,
//       nationality: recipe[0][nationality] === undefined ? '' : recipe[0][nationality],
//       category: recipe[0].strCategory,
//       alcoholicOrNot: recipe[0][alcoholicOrNot] === undefined
//         ? '' : recipe[0][alcoholicOrNot],
//       name: recipe[0][name],
//       image: recipe[0][imgPath],
//     };
//     console.log(favoriteRecipeObject);
//     addFavoriteRecipe(favoriteRecipeObject);
//   };

//   const hrefReplaced = window.location.href.replace('/in-progress', '');

//   /*   console.log(hrefSplit);
//  */
//   useEffect(() => {
//     const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
//     if (getFavoriteRecipes) {
//       const favoriteRecipesIds = getFavoriteRecipes.map(
//         (recipeMap: FavoriteRecipeType) => recipeMap.id,
//       );
//       if (favoriteRecipesIds.includes(id as string)) {
//         setIsFavorite(true);
//       }
//     }
//     getRecipes();
//   }, [location.pathname, id]);

//   useEffect(() => {
//     localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
//   }, [favoritesRecipes]);

//   /*   useEffect(() => {
//     const storedInProgressRecipes: {
//       [key: string]: { [key: string]: boolean } } = JSON.parse(localStorage
//       .getItem(localStorageKey) || '{}');
//   }, []); */

//   return (
//     <div>
//       { recipe && (
//         <div>
//           <img
//             data-testid="recipe-photo"
//             src=""
//             alt="Imagem do prato"
//           />
//           <h2 data-testid="recipe-title">Titulo</h2>
//           <h3>Ingredientes:</h3>
//           {renderIngredientsAndMeasures()}
//           <h4 data-testid="recipe-category">Categoria</h4>
//           <span data-testid="instructions">
//             Instruções

//           </span>
//         </div>
//       )}

//       <input
//         type="image"
//         src={ isFavorite ? isFavoriteImage : notFavoriteImage }
//         className="btn-category"
//         alt="blackHeartIcon"
//         data-testid="favorite-btn"
//         onClick={ () => handleClickFavorite() }
//         style={ { maxWidth: '100%', maxHeight: '100%' } }
//       />
//       <Button
//         dataTestId="share-btn"
//         buttonLabel="Compartilhar"
//         onClick={ () => copyLinkDetail(hrefReplaced) }
//       />
//       {copyMessage && (
//         <p>Link copied!</p>
//       )}
//       <Button
//         dataTestId="finish-recipe-btn"
//         buttonLabel="Finalizar"
//         onClick={ () => {} }
//       />
//     </div>
//   );
// }
// export default RecipeInProgress;
