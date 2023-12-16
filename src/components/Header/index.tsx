import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchImage from '../../images/searchIcon.svg';
import profileImage from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import logoRecipeApp from '../../images/logo Recipes app.svg';
import iconRecipeApp from '../../images/ícone Recipes app.svg';
import styles from './header.module.css';
import searchIcon from '../../images/icone pesquiar.svg';
import profileIcon from '../../images/icone-perfil.svg';
import drinkIcon from '../../images/icone-prato (1).svg';
import mealIcon from '../../images/icone-prato.svg';

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
      <div>
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
      </div>
    );
  }
  return (
    <div>
      <header className={ styles.header }>
        <div>
          <img
            src={ iconRecipeApp }
            alt="Recipe App Icon"
          />
          <img
            src={ logoRecipeApp }
            alt="Recipe App Logo"
          />
        </div>
        <div>
          <button onClick={ searchShow }>
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
          <button onClick={ handleNavigate }>
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>
          {show === 'show' && (
            <SearchBar />
          )}
        </div>
      </header>
      <div className={ styles.title }>
        <img
          src={ tipo === 'drinks' ? drinkIcon : mealIcon }
          alt="Icon"
        />
        <h1 data-testid="page-title">{ tipo }</h1>
      </div>
    </div>
  );
}
export default Header;
