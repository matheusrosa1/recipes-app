import { useState } from 'react';
import RecipeInProgressContext from './RecipeInProgressContext';
import { MealType, DrinkType, FavoriteRecipeType, DoneRecipeType } from '../types';

type FilterProviderProps = {
  children: React.ReactNode
};

function RecipeInProgressProvider({ children }:FilterProviderProps) {
  const [doneIngredientsList, setDoneIngredientsList] = useState<string[]>([]);
  const [copyBoolean, setCopyBoolean] = useState<boolean>(false);
  const [favoriteBoolean, setFavoriteBoolean] = useState<boolean>(false);
  const [recipeStarted, setRecipeStarted] = useState(false);
  function setDoneIngredientsOnLocalStorage(
    updatedData:string[],
    typeOfRecipe:'meals' | 'drinks',
    idOfRecipe:string,
  ) {
    const rawLocalData = localStorage.getItem('inProgressRecipes');
    if (rawLocalData) {
      const localData = JSON.parse(rawLocalData);
      if (localData[typeOfRecipe]) {
        const dataPackage = {
          ...localData,
          [typeOfRecipe]: {
            ...localData[typeOfRecipe],
            [idOfRecipe]: updatedData,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify({ ...dataPackage }));
      } else {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ ...localData, [typeOfRecipe]: { [idOfRecipe]: updatedData } }),
        );
      }
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ [typeOfRecipe]: { [idOfRecipe]: updatedData } }),
      );
    }
  }
  function getDoneIngredientsFromLocalStorage(typeOfRecipe:string, idOfRecipe:string) {
    const rawLocalData = localStorage.getItem('inProgressRecipes');
    if (rawLocalData) {
      const localData = JSON.parse(rawLocalData);
      if (localData[typeOfRecipe]) {
        const localKey = Object.keys(
          localData[typeOfRecipe],
        ).find((key) => key === idOfRecipe);
        if (localKey) {
          setDoneIngredientsList(localData[typeOfRecipe][localKey]);
          setRecipeStarted(true);
        }
      }
    }
  }

  function handleChangeDoneIngredients(
    check:boolean,
    name:string,
    typeOfRecipe:'meals' | 'drinks',
    idOfRecipe:string,
  ) {
    if (check) {
      const updatedData = [name, ...doneIngredientsList];
      setDoneIngredientsList(updatedData);
      setDoneIngredientsOnLocalStorage(updatedData, typeOfRecipe, idOfRecipe);
    } else {
      const updatedData = doneIngredientsList?.filter((string) => string !== name);
      setDoneIngredientsList(updatedData);
      setDoneIngredientsOnLocalStorage(updatedData, typeOfRecipe, idOfRecipe);
    }
  }

  const handleShare = async (typeOfRecipe:'meals' | 'drinks', idOfRecipe:string) => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/${typeOfRecipe}/${idOfRecipe}`);
      setCopyBoolean(true);
    } catch (error) {
      console.log(error);
    }
  };
  // essa função pode ser reaproveitada caso exista outro botão de favoritar, essa set o favoriteBollean para true caso achei um FavObj com o msm id ja no local storage
  // para não perder o status de favorito ao recarregar a pagina
  function getFavoriteFromLocalStorage(idOfRecipe:string) {
    const rawData = localStorage.getItem('favoriteRecipes');
    if (rawData) {
      const localData = JSON.parse(rawData);
      setFavoriteBoolean(
        Boolean(localData
          .find((favorite:FavoriteRecipeType) => favorite.id === idOfRecipe)),
      );
    }
  }
  function handleFavorite(
    mealData: MealType[] | [],
    drinkData: DrinkType[] | [],
    idOfRecipe: string,
  ) {
    if (favoriteBoolean) {
      setFavoriteBoolean(false);
      favoriteHelper(idOfRecipe, null);
    } else {
      setFavoriteBoolean(true);
      if (drinkData?.length > 0) {
        const { strCategory, strAlcoholic, strDrink, strDrinkThumb } = drinkData[0];
        const favoriteObj = {
          id: idOfRecipe,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        };
        favoriteHelper(idOfRecipe, favoriteObj);
      } else if (mealData?.length > 0) {
        const { strCategory, strArea, strMeal, strMealThumb } = mealData[0];
        const favoriteObj = {
          id: idOfRecipe,
          type: 'meal',
          nationality: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        };
        favoriteHelper(idOfRecipe, favoriteObj);
      }
    }
  }

  function favoriteHelper(
    idOfRecipe:string,
    favoriteObj:FavoriteRecipeType | null,
  ) {
    const rawData = localStorage.getItem('favoriteRecipes');
    if (favoriteObj) {
      if (rawData) {
        const localData = JSON.parse(rawData);
        if (!(localData.find((obj:any) => obj.id === idOfRecipe))) {
          const dataPackage = [
            ...localData,
            favoriteObj,
          ];
          console.log(dataPackage);
          localStorage.setItem('favoriteRecipes', JSON.stringify(dataPackage));
        }
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteObj]));
      }
    } else {
      const localData = JSON.parse(rawData as string);
      const filteredFavorite = localData.filter((favorite: FavoriteRecipeType) => {
        return (favorite.id !== idOfRecipe);
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorite));

      // Se a lista de favoritos ficou vazia, também podemos ajustar favoriteBoolean aqui
      setFavoriteBoolean(false);
    }
  }

  function handleFinish(
    mealData:MealType[] | [],
    drinkData:DrinkType[] | [],
    idOfRecipe:string,
  ) {
    const date = new Date();
    if (mealData.length > 0) {
      const { strCategory, strArea, strMeal, strMealThumb, strTags } = mealData[0];
      const tagsArray = strTags ? strTags.split(',') : [];
      const doneObj = {
        id: idOfRecipe,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: date,
        tags: tagsArray,
      };
      finishHelper(idOfRecipe, doneObj);
    } else {
      const {
        strCategory,
        strAlcoholic,
        strDrink,
        strDrinkThumb,
        strTags } = drinkData[0];
      const tagsArray = strTags ? strTags.split(',') : [];
      const doneObj = {
        id: idOfRecipe,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: date,
        tags: tagsArray,
      };
      finishHelper(idOfRecipe, doneObj);
    }
  }
  function finishHelper(idOfRecipe:string, doneObj:DoneRecipeType) {
    const rawData = localStorage.getItem('doneRecipes');
    if (rawData) {
      const localData = JSON.parse(rawData);
      if (!(localData.find((obj:any) => obj.id === idOfRecipe))) {
        const dataPackage = [
          ...localData,
          doneObj,
        ];
        localStorage.setItem('doneRecipes', JSON.stringify(dataPackage));
        setRecipeStarted(false);
      }
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([doneObj]));
      setRecipeStarted(false);
    }
  }
  return (
    <RecipeInProgressContext.Provider
      value={ {
        getDoneIngredientsFromLocalStorage,
        handleChangeDoneIngredients,
        handleShare,
        handleFavorite,
        doneIngredientsList,
        copyBoolean,
        favoriteBoolean,
        getFavoriteFromLocalStorage,
        handleFinish,
        setRecipeStarted,
        recipeStarted,
      } }
    >
      { children }
    </RecipeInProgressContext.Provider>
  );
}
export default RecipeInProgressProvider;
