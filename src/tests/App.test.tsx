import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testes do requisito 2', () => {
  it('Verifica se estão corretos os data-testids email-input, password-input e login-submit-btn', () => {
    render(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
