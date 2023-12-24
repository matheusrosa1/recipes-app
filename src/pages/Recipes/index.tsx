import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCategoties, fetchByCategory, fetchRecipes } from '../../services/fetchAPI';
import { CategoriesType, RecipeType } from '../../types';
import { Button } from '../../components/Forms/Button';
import IconAllMeals from '../../images/Categories/Meals/All.svg';
import IconBeefMeal from '../../images/Categories/Meals/Beef.svg';
import IconBreakfastMeal from '../../images/Categories/Meals/Breakfast.svg';
import IconChickenMeal from '../../images/Categories/Meals/Chicken.svg';
import IconDessertMeal from '../../images/Categories/Meals/Dessert.svg';
import IconGoatMeal from '../../images/Categories/Meals/Goat.svg';
import IconAllDrinks from '../../images/Categories/Drinks/All.svg';
import IconCocktailDrinks from '../../images/Categories/Drinks/Cocktail.svg';
import IconCocoaDrinks from '../../images/Categories/Drinks/Cocoa.svg';
import IconOrdinaryDrink from '../../images/Categories/Drinks/Ordinary Drink.svg';
import IconOtherDrink from '../../images/Categories/Drinks/Other.svg';
import IconShakeDrink from '../../images/Categories/Drinks/Shake.svg';
import styles from './recipes.module.css';

export type RecipeProp = {
  type: string,
};

function Recipes({ type } : RecipeProp) {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const getData = async () => {
    try {
      const recipesData = await fetchRecipes(location.pathname);
      const recipesDataSplice = [...recipesData].splice(0, 12);
      setRecipes(recipesDataSplice as RecipeType[]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const categoriesData = await fetchCategoties(location.pathname);
      const categoriesDataSplice = [...categoriesData].splice(0, 5);
      setCategories(categoriesDataSplice);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipesByCategory = async (category: string) => {
    try {
      const recipesData = await fetchByCategory(location.pathname, category);
      const recipesDataSplice = [...recipesData].splice(0, 12);
      setRecipes(recipesDataSplice as RecipeType[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const handleFilterByCategory = async (category: string) => {
    setToggle(!toggle);
    if (toggle) {
      getData();
      return;
    }
    getRecipesByCategory(category);
  };

  const renderCategoriesIcons = (strCategory: string | undefined) => {
    if (type === 'Meals') {
      switch (strCategory) {
        case 'Beef':
          return IconBeefMeal;
        case 'Chicken':
          return IconChickenMeal;
        case 'Dessert':
          return IconDessertMeal;
        case 'Goat':
          return IconGoatMeal;
        case 'Breakfast':
          return IconBreakfastMeal;
        default:
          break;
      }
    }
    switch (strCategory) {
      case 'Ordinary Drink':
        return IconOrdinaryDrink;
      case 'Cocktail':
        return IconCocktailDrinks;
      case 'Shake':
        return IconShakeDrink;
      case 'Other / Unknown':
        return IconOtherDrink;
      case 'Cocoa':
        return IconCocoaDrinks;
      default:
        break;
    }
  };

  const id = location.pathname === '/meals' ? 'idMeal' : 'idDrink';
  const img = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const name = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <>
      <div className={ styles.categories }>
        <button
          data-testid="All-category-filter"
          onClick={ () => getData() }
        >
          <img
            src={ type === 'Meals' ? IconAllMeals : IconAllDrinks }
            alt="Icon All"
          />
          All
        </button>
        {categories && categories.map(({ strCategory }: CategoriesType, index) => (
          <div key={ index }>
            <button
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleFilterByCategory(strCategory) }
            >
              <img
                src={ renderCategoriesIcons(strCategory) }
                alt="Icons"
              />
              <span>{strCategory}</span>
            </button>
            {/*             <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              className="btn-start-recipe btn-category"
              onClick={ () => handleFilterByCategory(strCategory) }
            /> */}
            {/*             <Button
              dataTestId={ `${strCategory}-category-filter` }
              onClick={ () => handleFilterByCategory(strCategory) }
              buttonLabel={ strCategory }
            /> */}
          </div>
        ))}

      </div>
      <div className="recipes-container">
        {recipes && recipes.map((recipe: RecipeType, index) => (
          <div
            className="recipes-item"
            key={ recipe[id] }
          >

            <div
              data-testid={ `${index}-recipe-card` }
              onClick={ () => navigate(`${location.pathname}/${recipe[id]}`) }
              onKeyDown={ (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`${location.pathname}/${recipe[id]}`);
                }
              } }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ recipe[img] }
                alt={ recipe[name] }
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {recipe[name]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Recipes;
