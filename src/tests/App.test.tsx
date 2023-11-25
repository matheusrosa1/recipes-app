import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const submitTestId = 'submit-btn';

describe('Testes do requisito 2', () => {
  it('Verifica se estão corretos os data-testids email-input, password-input e login-submit-btn', () => {
    render(<App />);
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
    render(<App />);
    const emailTest = 'test@email.com';
    const passwordTest = '123456789';
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
    render(<App />);
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão de login está desabilitado quando um email inválido é digitado', () => {
    render(<App />);
    const emailTest = 'test@email';
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão de login está desabilitado quando uma senha de 6 ou menos caracteres é digitada', () => {
    render(<App />);
    const passwordTest = '123456';
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão de login está habilitado quando um email válido e uma senha de mais de 6 caracteres são digitados', () => {
    render(<App />);
    const emailTest = 'test@email.com';
    const passwordTest = '123456789';
    fireEvent.change(screen.getByTestId(emailInputTestId), { target: { value: emailTest } });
    fireEvent.change(screen.getByTestId(passwordInputTestId), { target: { value: passwordTest } });
    const submitButton = screen.getByTestId(submitTestId);
    expect(submitButton).toBeEnabled();
  });
});
