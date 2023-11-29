import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../components/Profile';

const emailId = 'profile-email';
const doneId = 'profile-done-btn';
const favoriteId = 'profile-favorite-btn';
const logoutId = 'profile-logout-btn';

describe('Testes do Componente Profile', () => {
  test('testa se tudo se renderiza corretamente na tela', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const email = screen.getByTestId(emailId);
    const doneBtn = screen.getByTestId(doneId);
    const favoriteBtn = screen.getByTestId(favoriteId);
    const logoutBtn = screen.getByTestId(logoutId);
    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  test('testa se existe click no botao favorite', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const favoriteBtn = screen.getByTestId(favoriteId);
    expect(favoriteBtn).toBeInTheDocument();
    fireEvent.click(favoriteBtn);
  });
  test('testa se existe click no botao done', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const doneBtn = screen.getByTestId(doneId);
    expect(doneBtn).toBeInTheDocument();
    fireEvent.click(doneBtn);
  });
  test('testa se existe click no botao logout', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const logoutBtn = screen.getByTestId(logoutId);
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
  });
  test('testa para ver o conteudo do user event varia', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const logoutBtn = screen.getByTestId(logoutId);
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
  });
});
