import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Testes do Componente Footer', () => {
  const mealsBtn = 'meals-bottom-btn';
  const drinksBtn = 'drinks-bottom-btn';
  const foot = 'footer';
  test('verifica se renderiza os butons de meals e drinks', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(foot)).toBeInTheDocument();
    expect(screen.getByTestId(drinksBtn)).toBeInTheDocument();
    expect(screen.getByTestId(mealsBtn)).toBeInTheDocument();
  });
  test('verifica se clicka no botao drinks', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const drink = screen.getByTestId(drinksBtn);
    expect(drink).toBeInTheDocument();
    fireEvent.click(drink);
  });
  test('verifica se clicka no botao meals', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const meal = screen.getByTestId(mealsBtn);
    expect(meal).toBeInTheDocument();
    fireEvent.click(meal);
  });
});
