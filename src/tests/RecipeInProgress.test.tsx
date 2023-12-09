import { fireEvent, screen, within } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const path = '/meals/52977/in-progress';

describe('Testes do Componente SearchBar', () => {
  it('Verifica se estão corretos os data-testids em meals', () => {
    renderWithRouter(<App />, { route: path });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
  });
  it('Verifica se estão corretos os data-testids em drinks', () => {
    renderWithRouter(<App />, { route: '/drinks/17222/in-progress' });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
  });
  it('Todos os elementos possuem uma checkbox', async () => {
    renderWithRouter(<App />, { route: path });
    const firstIngredient = await screen.findByTestId('0-ingredient-step');
    expect(firstIngredient).toBeInTheDocument();
    const ingredientSteps = screen.getAllByTestId(/\d+-ingredient-step/);
    ingredientSteps.forEach((ingredient) => {
      const checkbox = within(ingredient).getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });
  });
  it('ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista', async () => {
    renderWithRouter(<App />, { route: path });
    const firstIngredient = await screen.findByTestId('0-ingredient-step');
    const checkbox = within(firstIngredient).getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(firstIngredient).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
  });
});
