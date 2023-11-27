import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinksAPI, getMealsAPI } from '../../services/fetchAPI';

function Recipes() {
  const location = useLocation();
  console.log(location.pathname);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (location.pathname === '/meals') {
          const mealsData = await getMealsAPI();
          const mealsDataSplice = mealsData.splice(0, 12);
          const { id } = mealsDataSplice.idMeal;
          setMeals(mealsDataSplice);
          console.log(meals);
        } else if (location.pathname === '/drinks') {
          const drinksData = await getDrinksAPI();
          const drinksDataSplice = drinksData.splice(0, 12);
          const { id } = drinksDataSplice.idDrink;
          setDrinks(drinksDataSplice);
        }
      } catch (error) {
        console.log('Erro ao buscar os dados na API', error);
      }
    };
    getData();
  }, []);

  const { id }: string | undefined = meals.idMeal;

  return (
    <div>
      {meals && meals.map((meal, index) => (
        <div
          key={ id }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ meal.strMealThumb }
            alt={ meal.name }
            data-testid={ `${index}-card-img` }
          />
          <p>{meal.name}</p>
        </div>
      ))}
      {/*       {data} */}
    </div>
  );
}

export default Recipes;
