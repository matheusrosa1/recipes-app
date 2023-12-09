import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import { MOCK_RECIPES_TEST_MEALS, MOCK_RECIPES_TEST_DRINKS } from './Mocks/mocksRecipes';

describe('Testes do Componente Recipes', () => {
  afterEach(() => vi.clearAllMocks());
  it('Carregue as 12 primeiras receitas de comidas, uma em cada card', async () => {
    const fetchResolvedValue = {
      json: async () => MOCK_RECIPES_TEST_MEALS,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/meals' });
    // Verifique se as 12 primeiras receitas carregam
    const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
  it('Carregue as 12 primeiras receitas de bebidas, uma em cada card', async () => {
    const fetchResolvedValue = {
      json: async () => MOCK_RECIPES_TEST_DRINKS,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<App />, { route: '/drinks' });
    // Verifique se as 12 primeiras receitas carregam
    const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
  // it('Fetch recipes por categoria e chama setRecipes', async () => {
  //   const fetchResolvedValue = {
  //     json: async () => MOCK_RECIPES_TEST_MEALS,
  //   } as Response;
  //   const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);
  //   renderWithRouter(<App />, { route: '/meals' });
  //   // Await para carregar o botao de id beef-category-filter
  //   const beefCategoryFilter = await screen.findByTestId('Beef-category-filter');
  //   // Clica no botao de id beef-category-filter
  //   fireEvent.click(beefCategoryFilter);
  //   expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  // });
});
