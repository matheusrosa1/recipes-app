import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../utils/renderWithRouter';
import { mockDoneRecipes } from './Mocks/mockLocalStorage';

const testId = '0-horizontal-name';

describe('Testes para o componente DoneRecipes', () => {
  it('deve renderizar corretamente', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { user } = renderWithRouter(<DoneRecipes />);

    screen.findByRole('heading', { name: 'Done Recipes' });

    const drinks = screen.getByText('Drinks');
    const all = screen.getByText('All');
    const firstCard = await screen.findByTestId(testId);

    expect(firstCard).toHaveTextContent('Bistek');

    await user.click(drinks);
    const firstCard1 = await screen.findByTestId(testId);
    expect(firstCard1).toHaveTextContent('Smut');

    await user.click(all);
    const firstCard2 = await screen.findByTestId(testId);
    expect(firstCard2).toHaveTextContent('Bistek');

    await user.click(screen.getByTestId('0-horizontal-share-btn'));
  });

  it('deve renderizar apenas receitas de refeições ao filtrar por "Meals"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { user } = renderWithRouter(<DoneRecipes />);

    await user.click(screen.getByTestId('filter-by-meal-btn'));

    // Ensure only meal recipes are displayed
    const mealCards = await screen.findAllByTestId(/(\d+)-horizontal-name/);
    expect(mealCards).toHaveLength(2); // Two meal recipes in mockDoneRecipes

    // Check the content of the first meal recipe
    const firstMealCard = mealCards[0];
    expect(firstMealCard).toHaveTextContent('Bistek');
  });

  it('deve renderizar todas as receitas ao clicar em "All"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { user } = renderWithRouter(<DoneRecipes />);

    await user.click(screen.getByTestId('filter-by-all-btn'));

    // Ensure all recipes are displayed
    const allCards = await screen.findAllByTestId(/(\d+)-horizontal-name/);
    expect(allCards).toHaveLength(4); // All recipes in mockDoneRecipes

    // Check the content of the first recipe
    const firstCardAll = allCards[0];
    expect(firstCardAll).toHaveTextContent('Bistek');
  });

  it('deve renderizar apenas receitas de bebidas ao filtrar por "Drinks"', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { user } = renderWithRouter(<DoneRecipes />);

    await user.click(screen.getByTestId('filter-by-drink-btn'));

    // Ensure only drink recipes are displayed
    const drinkCards = await screen.findAllByTestId(/(\d+)-horizontal-name/);
    expect(drinkCards).toHaveLength(2); // Two drink recipes in mockDoneRecipes

    // Check the content of the first drink recipe
    const firstDrinkCard = drinkCards[0];
    expect(firstDrinkCard).toHaveTextContent('Smut');
  });
});
