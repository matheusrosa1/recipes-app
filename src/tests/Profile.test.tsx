import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import userEvent from '@testing-library/user-event';
import Profile from '../components/Profile';
import App from '../App';

const emailId = 'profile-email';
const doneId = 'profile-done-btn';
const favoriteId = 'profile-favorite-btn';
const logoutId = 'profile-logout-btn';
const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const submitTestId = 'login-submit-btn';
const emailExample = 'test@email.com';
const passwordExample = '123456789';
const profile = 'profile-top-btn';

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
  test('testa se o email aparece certo', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
    const email = screen.getByTestId(emailId);
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('');
  });
  test('testa se o email aparece certo', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const emailTest = emailExample;
    const passwordTest = passwordExample;
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    const submitButton = screen.getByTestId(submitTestId);
    fireEvent.click(submitButton);
    const profileBtn = screen.getByTestId(profile);
    fireEvent.click(profileBtn);
    const email = screen.getByTestId(emailId);
    expect(email).toHaveTextContent(emailTest);
  });
});
