export const fetchRecipes = async (path: any) => {
  if (path === '/meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};

export const fetchCategoties = async (path: any) => {
  if (path === '/meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
};

export const fetchByCategory = async (path: any, category: string) => {
  if (path === '/meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchRecipesById = async (path: any, id: string) => {
  if (path === 'meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks;
};
