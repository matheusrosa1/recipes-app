import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import App from '../App';
import { MOCK_DRINKS_CATEGORIES, MOCK_MEALS_CATEGORY } from './mocks';
import * as fetchs from '../services/fetchAPI';
import { renderWithRouter } from '../utils/renderWithRouter';
import Recipes from '../components/Recipes';

describe('Testando componente Recipes.tsx', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testando se as categorias dos Drinks estão renderizando corretamente', async () => {
    vi.spyOn(fetchs, 'fetchCategoties').mockResolvedValue(MOCK_MEALS_CATEGORY);
    /*     const mockfetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => MOCK_MEALS_CATEGORY,
    } as Response); */
    renderWithRouter(<App />, { route: '/meals' });
    /*     expect(mockfetch).toHaveBeenCalledTimes(2); */

    const heading = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(heading).toBeInTheDocument();

    const ordinaryBtn = await screen.findByRole('button', {
      name: /Beef/i,
    });

    expect(ordinaryBtn).toBeInTheDocument();

    /*     const ordinaryDrinkBtn = await screen.findByRole('button', {
      name: /ordinary drink/i,
    }); */
    /*     const ordinaryDrinkBtn = screen.findByRole('button', {
      name: /ordinary drink/i,
    }); */
    /*     expect(ordinaryDrinkBtn).toBeInTheDocument(); */
  });
});
