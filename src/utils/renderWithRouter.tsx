import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProviders';
import RecipeInProgressProvider from '../context/RecipesInProgressProvider';

// Define uma função chamada 'renderWithRouter' que renderiza componentes React para testes
const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  // Altera a rota no histórico do navegador para a rota especificada (ou '/' por padrão)
  window.history.pushState({}, '', route);

  // Retorna um objeto contendo as funções do 'user-event' e o resultado da função 'render'
  return {
    user: userEvent.setup(),
    ...render(
      <RecipeInProgressProvider>
        <RecipesProvider>
          <BrowserRouter>
            {ui}
          </BrowserRouter>
        </RecipesProvider>
      </RecipeInProgressProvider>,
    ), // Utiliza o 'BrowserRouter' como wrapper para o componente renderizado
  };
};

// Exporta a função 'renderWithRouter' para ser utilizada em testes
export default renderWithRouter;

export const renderWithRouterAndRecipeProvider = (
  ui: JSX.Element,
  { route = '/' } = {},
) => {
  // Altera a rota no histórico do navegador para a rota especificada (ou '/' por padrão)
  window.history.pushState({}, '', route);

  // Retorna um objeto contendo as funções do 'user-event' e o resultado da função 'render'
  return {
    user: userEvent.setup(),
    ...render(
      <RecipeInProgressProvider>
        {/* <RecipesProvider> */}
        <BrowserRouter>
          { ui }
        </BrowserRouter>
        {/* </RecipesProvider> */}
      </RecipeInProgressProvider>,
    ),
  };
};
