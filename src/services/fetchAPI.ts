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

export const getRecipes = (location: any) => {
  if (location.pathname === '/meals') {
    return getMealsAPI();
  } else {
    return getDrinksAPI();  
  }
}