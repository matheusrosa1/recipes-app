import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import App from '../App';
import { MOCK_DRINKS_CATEGORIES, MOCK_MEALS_CATEGORY } from './mocks';
import * as fetchs from '../services/fetchAPI';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Testando componente Recipes.tsx', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testando se as categorias dos Drinks estão renderizando corretamente', async () => {
    vi.spyOn(fetchs, 'fetchCategoties').mockResolvedValue(MOCK_MEALS_CATEGORY);
    renderWithRouter(<App />, { route: '/meals' });

    const heading = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
