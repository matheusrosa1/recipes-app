export type RecipeType = {
  idDrink?: string;
  idMeal?: string;
  strDrinkThumb?: string;
  strMealThumb?: string;
  strDrink?: string;
  strMeal?: string;
  [key: string]: string | undefined;
  strCategory?: string,
  strInstructions?: string,
};

export type DrinkType = {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strTags: string;
};

export type MealType = {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strTags: string;
};

export type CategoriesType = {
  strCategory: string;
};

export type FavoriteRecipeType = {
  id: string | undefined,
  type: string | undefined,
  nationality: string | undefined;
  category: string | undefined,
  alcoholicOrNot: string | undefined;
  name: string | undefined,
  image: string | undefined,
};

export type CheckedIngredientsType = {
  meals: {
    [key: string]: [string];
  },
  drinks: {
    [key: string]: [string];
  },
};

export type DoneRecipeType = {
  id: string | undefined,
  type: string | undefined,
  nationality: string | undefined,
  category: string | undefined,
  alcoholicOrNot: string | undefined,
  name: string | undefined,
  image: string | undefined,
  doneDate: any,
  tags: string[] | undefined,
};
