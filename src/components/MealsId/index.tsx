import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getRecipesById } from '../../services/fetchAPI';

function MealsId() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  /*   const [, category, id] = location.pathname.split('/'); */

  /*   const getRecipes = async() = {
    getReciesById(location.pathname, id as string)
  } */
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeById = await getRecipesById(location.pathname, id as string);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, [location.pathname, id]);

  /*   console.log(location.pathname); */
  return (
    <div>
      <h1>Specific Meal</h1>
      <p>{id}</p>
      {/*       {recipe.map((recipeDetail) => (
        <li
      ))}
 */}
    </div>
  );
}
export default MealsId;
