export type RecipeType = {
  idDrink?: string;
  idMeal?: string;
  strDrinkThumb?: string;
  strMealThumb?: string;
  strDrink?: string;
  strMeal?: string;
  [key: string]: string | undefined;
  strCategory?: string,
};

export type DrinkType = {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
};

export type MealType = {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
};

export type CategoriesType = {
  strCategory: string;
};

export type ExtendedRecipeType = {
  id: string | undefined,
  type: string | undefined,
  nationality: string | undefined;
  category: string | undefined,
  alcoholicOrNot: string | undefined;
  name: string | undefined,
  image: string | undefined,
};
