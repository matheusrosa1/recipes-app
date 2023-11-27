import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinksAPI, getMealsAPI } from '../../services/fetchAPI';

function Recipes() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const recipesData = location.pathname === '/meals'
          ? await getMealsAPI() : await getDrinksAPI();
        const recipesDataSplice = recipesData.splice(0, 12);
        setRecipes(recipesDataSplice);
      } catch (error) {
        console.log('Erro ao buscar os dados na API', error);
      }
    };
    getData();
  }, []);

  const id = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  const img = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <div>
      {recipes && recipes.map((meal, index) => (
        
        <div
          key={ meal[id] }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ meal[img] }
            alt={ meal[name] }
            data-testid={ `${index}-card-img` }
            width={'100px'}
          />
          <p
            data-testid={ `${index}-card-name` }
          >{meal[name]}</p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
