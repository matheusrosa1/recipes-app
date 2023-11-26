import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchImage from '../../images/searchIcon.svg';
import profileImage from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';

type Titulo = {
  tipo: string,
};

function Header({ tipo }: Titulo) {
  const [show, setShow] = useState('hide');
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/profile');
  };
  const searchShow = () => {
    if (show === 'show') {
      setShow('hide');
    } else {
      setShow('show');
    }
  };
  if (tipo === 'Profile' || tipo === 'Done Recipes' || tipo === 'Favorite Recipes') {
    return (
      <header>
        <button onClick={ handleNavigate }>
          <img
            src={ profileImage }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
        <p data-testid="page-title">{ tipo }</p>
      </header>
    );
  }
  return (
    <header>
      <button onClick={ handleNavigate }>
        <img
          src={ profileImage }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>
      {show === 'show' && (
        <SearchBar />
      )}
      <button onClick={ searchShow }>
        <img
          src={ searchImage }
          alt="search"
          data-testid="search-top-btn"
        />
      </button>
      <p data-testid="page-title">{ tipo }</p>
    </header>
  );
}
export default Header;
