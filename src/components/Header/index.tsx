import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import logoRecipeApp from '../../images/logo Recipes app.svg';
import iconRecipeApp from '../../images/ícone Recipes app.svg';
import styles from './header.module.css';
import searchIcon from '../../images/icone pesquiar.svg';
import profileIcon from '../../images/icone-perfil.svg';
import drinkIcon from '../../images/icone-prato (1).svg';
import mealIcon from '../../images/icone-prato.svg';
import doneRecipeIcon from '../../images/Group 10.svg';
import favoriteIcon from '../../images/favoriteIcon.svg';
import perfilIconn from '../../images/Perfil.svg';

type Titulo = {
  tipo: string,
};

function Header({ tipo }: Titulo) {
  const [show, setShow] = useState('hide');
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/profile');
  };
  const path = window.location.href.split('/');
  console.log(path[3]);

  const renderIcon = (paths: string) => {
    if (paths === 'done-recipes') {
      return doneRecipeIcon;
    }
    if (paths === 'favorite-recipes') {
      return favoriteIcon;
    }
    return perfilIconn;
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
        <header
          className={ styles.header }
        >
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
          <button
            className={ styles.buttonWithoutBorder }
            onClick={ handleNavigate }
          >
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>
        </header>
        <div className={ styles.title }>
          <img
            src={ renderIcon(path[3]) }
            alt="Icon"
          />
          <h1
            data-testid="page-title"
          >
            { tipo }

          </h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <header className={ styles.header }>
        <div>
          <img
            className={ styles.logoIcon }
            src={ iconRecipeApp }
            alt="Recipe App Icon"
          />
          <img
            className={ styles.logoRecipeApp }
            src={ logoRecipeApp }
            alt="Recipe App Logo"
          />
        </div>
        <div>
          <button
            onClick={ searchShow }
            className={ styles.buttonWithoutBorder }
          >
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
          <button
            onClick={ handleNavigate }
            className={ styles.buttonWithoutBorder }
          >
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>

        </div>
      </header>
      <div className={ styles.title }>
        <img
          src={ tipo === 'Drinks' ? drinkIcon : mealIcon }
          alt="Icon"
        />
        <h1 data-testid="page-title">{ tipo }</h1>
      </div>
      {show === 'show' && (
        <SearchBar />
      )}
    </div>
  );
}
export default Header;
