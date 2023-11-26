import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Testes do Componente Header', () => {
  const tipoId = 'page-title';
  const searchBtn = 'search-top-btn';
  const profileBtn = 'profile-top-btn';
  test('verifica se renderiza com os butons de profile e search e tipo', () => {
    render(
      <BrowserRouter>
        <Header tipo="German" />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(tipoId)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
    expect(screen.getByTestId(profileBtn)).toBeInTheDocument();
  });
  test('verifica se renderiza sem o button de search', () => {
    render(
      <BrowserRouter>
        <Header tipo="Profile" />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(tipoId)).toBeInTheDocument();
    expect(screen.getByTestId(profileBtn)).toBeInTheDocument();
  });
  test('verifica se clicka e funciona o botao de pesquisa', () => {
    render(
      <BrowserRouter>
        <Header tipo="cano" />
      </BrowserRouter>,
    );
    const search = screen.getByTestId(searchBtn);
    expect(search).toBeInTheDocument();
    fireEvent.click(search);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    fireEvent.click(search);
  });
  test('verifica se clicka e funciona o botao de profile', () => {
    render(
      <BrowserRouter>
        <Header tipo="trybe" />
      </BrowserRouter>,
    );
    const profile = screen.getByTestId(profileBtn);
    expect(profile).toBeInTheDocument();
    fireEvent.click(profile);
  });
});
