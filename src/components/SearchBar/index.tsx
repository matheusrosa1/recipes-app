import { useState } from 'react';
import styles from './searchBar.module.css';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [inputValue, setInputValue] = useState('ingredientSearch');
  const path = window.location.pathname;

  const apiEndpoints: any = {
    '/meals': {
      ingredientSearch: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
      nameSearch: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      firstLetterSearch: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    },
    '/drinks': {
      ingredientSearch: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
      nameSearch: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      firstLetterSearch: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    },
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    const endpoint = apiEndpoints[path][inputValue];
    if (inputValue === 'firstLetterSearch' && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
      return;
    }

    fetch(`${endpoint}${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.meals && data.meals.length === 1) {
          window.location.href = `/meals/${data.meals[0].idMeal}`;
        }
        if (data.drinks && data.drinks.length === 1) {
          window.location.href = `/drinks/${data.drinks[0].idDrink}`;
        }
        if (data.meals === null || data.drinks === null) {
          alert("Sorry, we haven't found any recipes for these filters");
        }
      });
  };
  return (
    <form className={ styles.form }>
      <input
        className={ styles.seachInput }
        type="text"
        data-testid="search-input"
        placeholder="Search"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <div className={ styles.radiosDiv }>
        <div>
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredientSearchOption"
            name="searchOption"
            value="ingredientSearch"
            onChange={ ({ target }) => setInputValue(target.value) }
          />
          <label htmlFor="ingredientSearchOption">Ingredient</label>

          <input
            data-testid="name-search-radio"
            type="radio"
            id="nameSearchOption"
            name="searchOption"
            value="nameSearch"
            onChange={ ({ target }) => setInputValue(target.value) }
          />
          <label htmlFor="nameSearchOption">Name</label>

          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetterSearchOption"
            name="searchOption"
            value="firstLetterSearch"
            onChange={ ({ target }) => setInputValue(target.value) }
          />
          <label htmlFor="firstLetterSearchOption">First letter</label>
        </div>
        <div>
          <button
            className={ styles.searchButton }
            type="submit"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            <span>
              Search
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
export default SearchBar;
