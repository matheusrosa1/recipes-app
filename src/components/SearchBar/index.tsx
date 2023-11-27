function SearchBar() {
  return (
    <form>
      <input type="text" data-testid="search-input" />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        id="ingredientSearchOption"
        name="searchOption"
        value="ingredientSearch"
      />
      <label htmlFor="ingredientSearchOption">Ingredient</label>

      <input
        data-testid="name-search-radio"
        type="radio"
        id="nameSearchOption"
        name="searchOption"
        value="nameSearch"
      />
      <label htmlFor="nameSearchOption">Name</label>

      <input
        data-testid="first-letter-search-radio"
        type="radio"
        id="firstLetterSearchOption"
        name="searchOption"
        value="firstLetterSearch"
      />
      <label htmlFor="firstLetterSearchOption">First letter</label>

      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </form>
  );
}
export default SearchBar;
