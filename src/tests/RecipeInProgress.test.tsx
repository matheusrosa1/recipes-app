import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';

jest.mock('../../services/fetchAPI', () => ({
  getRecipesById: jest.fn().mockResolvedValue([
    {
      strIngredient1: 'Ingredient 1',
      strMeasure1: 'Measure 1',
      // ... Add more ingredients and measures as needed
    },
  ]),
}));

describe('RecipeInProgress', () => {
  it('renders the component with ingredients and checkboxes', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals/123/in-progress'] }>
        <Route path="/meals/:id/in-progress">
          <RecipeInProgress />
        </Route>
      </MemoryRouter>,
    );

    // Wait for the component to render with the mocked data
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getAllByTestId(/ingredient-step/)).toHaveLength(1);
    });
  });

  it('crosses out ingredient when checkbox is clicked', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals/123/in-progress'] }>
        <Route path="/meals/:id/in-progress">
          <RecipeInProgress />
        </Route>
      </MemoryRouter>,
    );

    // Wait for the component to render with the mocked data
    await waitFor(() => {
      expect(screen.getAllByTestId(/ingredient-step/)).toHaveLength(1);
    });

    // Click the checkbox
    const checkbox = screen.getByTestId('0-ingredient-step').querySelector('input');
    fireEvent.click(checkbox);

    // Verify that the ingredient is crossed out
    await waitFor(() => {
      expect(checkbox).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    });
  });
});
