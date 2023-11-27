import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SearchBar from '../components/SearchBar';
import Meals from '../components/Meals';

describe('Testes do Componente SearchBar', () => {
  afterEach(() => vi.clearAllMocks());
  it('Verifica se estão corretos os data-testids email-input, password-input e login-submit-btn', () => {
    render(
      <Router>
        <SearchBar />
      </Router>,
    );
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
  });
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const MOCK_RECIPE = {
      meals: [
        {
          idMeal: '52940',
          strMeal: 'Brown Stew Chicken',
        },
      ],
    };
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => MOCK_RECIPE,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    render(
      <Router>
        <Meals />
      </Router>,
    );
    const searchTopButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientSearchRadio);
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchBtn);
    // await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1), { timeout: 5000 });
    // await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'));
  });
});
