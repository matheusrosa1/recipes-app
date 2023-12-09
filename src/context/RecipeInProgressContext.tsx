import { createContext } from 'react';
import { MealType, DrinkType } from '../types';

type RecipeInProgressContextType = {
  getDoneIngredientsFromLocalStorage:(
    typeOfRecipe:'meals' | 'drinks', idOfRecipe:string
  )=>void,
  handleChangeDoneIngredients:(
    check:boolean, name:string, typeOfRecipe:'meals' | 'drinks', idOfRecipe:string
  )=>void,
  handleShare:(typeOfRecipe:'meals' | 'drinks', idOfRecipe:string)=>void,
  handleFavorite:(
    mealData:MealType[],
    drinkData:DrinkType[],
    idOfRecipe:string,
  )=>void,
  getFavoriteFromLocalStorage:(idOfRecipe:string)=>void,
  doneIngredientsList:string[],
  copyBoolean:boolean,
  favoriteBoolean:boolean,
  handleFinish:(
    mealData:MealType[] | [],
    drinkData:DrinkType[] | [],
    idOfRecipe:string,
  )=>void,
  recipeStarted:boolean,
  setRecipeStarted: React.Dispatch<React.SetStateAction<boolean>>
};

const RecipeInProgressContext = createContext({} as RecipeInProgressContextType);

export default RecipeInProgressContext;
