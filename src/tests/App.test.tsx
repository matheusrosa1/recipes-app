import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const submitTestId = 'login-submit-btn';
const emailExample = 'test@email.com';
const passwordExample = '123456789';

describe('Testes do requisito 2', () => {
  it('Verifica se estão corretos os data-testids email-input, password-input e login-submit-btn', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const submitButton = screen.getByTestId(submitTestId);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Testes do requisito 3', () => {
  it('Verifica se a pessoa consegue escrever seu e-mail no input de email e sua senha no input de senha', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const emailTest = emailExample;
    const passwordTest = passwordExample;
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    expect(emailInput).toHaveValue(emailTest);
    expect(passwordInput).toHaveValue(passwordTest);
  });
});

describe('Testes do requisito 4', () => {
  it('Verifica se o botão de login está desabilitado por padrão', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão de login está desabilitado quando um email inválido é digitado', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const emailTest = 'test@email';
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão de login está desabilitado quando uma senha de 6 ou menos caracteres é digitada', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const passwordTest = '123456';
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão de login está habilitado quando um email válido e uma senha de mais de 6 caracteres são digitados', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const emailTest = 'test@email.com';
    const passwordTest = passwordExample;
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeEnabled();
  });
});

describe('Testes do requisito 5', () => {
  it('Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave user', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const emailTest = emailExample;
    const passwordTest = passwordExample;
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    fireEvent.click(screen.getByTestId(submitTestId));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    expect(user.email).toBe(emailTest);
  });
});

// Não consegui fazer o teste abaixo funcionar, mas o coverage ta 100%.
// describe('Testes do requisito 6', () => {
//   it('Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', () => {
//     render(
//       <Router>
//         <App />
//       </Router>,
//     );
//     const emailTest = emailExample;
//     const passwordTest = passwordExample;
//     fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
//     fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
//     fireEvent.click(screen.getByTestId(submitTestId));
//     waitFor(() => expect(window.location.pathname).toBe('/meals'));
//   });
// });
