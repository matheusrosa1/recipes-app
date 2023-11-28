export const getMealsAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
};

export const getDrinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};

// export const getRecipes = (path: any) => {
//   if (path === '/meals') {
//     return getMealsAPI();
//   } else {
//     return getDrinksAPI();
//   }
// }

export const getMealsCategoriesAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals;
};

export const getDrinksCategoriesAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
};

export const getCategoties = (path: any) => {
  if (path === '/meals') {
    return getMealsCategoriesAPI();
  }
  return getDrinksCategoriesAPI();
};

export const getMealsByCategoryAPI = async (category: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};

export const getDrinksByCategoryAPI = async (category: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
};

export const getByCategory = (path: any, category: string) => {
  if (path === '/meals') {
    return getMealsByCategoryAPI(category);
  }
  return getDrinksByCategoryAPI(category);
};
