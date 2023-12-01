import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

import { renderWithRouter } from '../utils/renderWithRouter';
import SearchBar from '../components/SearchBar';
import App from '../App';
import { MOCK_RECIPES_MEALS, oneDrink, oneMeal } from './mocks';

const searchTopBtnTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const ingredientSearchRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterSearchRadioTestId = 'first-letter-search-radio';
const execSearchBtnTestId = 'exec-search-btn';

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
    const fetchResolvedValue = {
      json: async () => MOCK_RECIPES_MEALS,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/meals' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioTestId);
    fireEvent.click(ingredientSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'));
  });
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo nome', async () => {
    const fetchResolvedValue = {
      json: async () => MOCK_RECIPES_MEALS,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/meals' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(searchInput, { target: { value: 'beef' } });
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    fireEvent.click(nameSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=beef'));
  });
  it('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async () => {
    const fetchResolvedValue = {
      json: async () => MOCK_RECIPES_MEALS,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/meals' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(searchInput, { target: { value: 'b' } });
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioTestId);
    fireEvent.click(firstLetterSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b'));
  });
  it('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, { route: '/meals' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const firstLetterInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(firstLetterInput, { target: { value: 'be' } });
    const nameSearchRadio = screen.getByTestId(firstLetterSearchRadioTestId);
    fireEvent.click(nameSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
    alertSpy.mockRestore();
  });

  it('testa se pegando pegando uma bebida faz o fetch corretamente', async () => {
    const fetchResolvedValue = {
      json: async () => oneDrink,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/drinks' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(searchInput, { target: { value: 'Aquamarine' } });
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    fireEvent.click(nameSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'));
  });

  it('testa se pegando pegando uma comida apenas faz o fetch corretamente', async () => {
    const fetchResolvedValue = {
      json: async () => oneMeal,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/meals' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(searchInput, { target: { value: 'Arrabiata' } });
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    fireEvent.click(nameSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'));
  });

  it('Se a busca não retornar nada, deve-se exibir um alert', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const fetchResolvedValue = {
      json: async () => ({ meals: null }),
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/meals' });
    const searchTopButton = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchTopButton);
    const searchInput = screen.getByTestId(searchInputTestId);
    fireEvent.change(searchInput, { target: { value: 'b' } });
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioTestId);
    fireEvent.click(firstLetterSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnTestId);
    fireEvent.click(execSearchBtn);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b'));
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters"));
    alertSpy.mockRestore();
  });
});
