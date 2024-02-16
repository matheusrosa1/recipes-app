import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from './profile.module.css';
import favoriteRecipe from '../../images/favoriteRecipes.png';
import logoutIcon from '../../images/LOGOUT.png';
import vectorCheck from '../../images/Vector check.png';

export default function Profile() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const navigateDoneRecipes = () => {
    navigate('/done-recipes');
  };

  const navigateFavorite = () => {
    navigate('/favorite-recipes');
  };

  const navigateLogin = () => {
    navigate('/');
    localStorage.clear();
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    const users = JSON.parse(user as string);
    setEmail(users?.email || ''); // Define um valor padrão como string vazia caso o email seja indefinido
  }, []);

  return (
    <div>
      <Header tipo="Profile" />
      <div className={ styles.profileContainer }>
        <h1 data-testid="profile-email">{email}</h1>
        <div className={ styles.buttonsContainer }>
          <button
            onClick={ navigateDoneRecipes }
            data-testid="profile-done-btn"
            className={ styles.buttons }
          >
            <img src={ vectorCheck } alt="done-recipes" />
            <p>Done Recipes</p>
          </button>
          <button
            onClick={ navigateFavorite }
            data-testid="profile-favorite-btn"
            className={ styles.buttons }
          >
            <img src={ favoriteRecipe } alt="favorite-recipes" />
            <p>Favorite Recipes</p>
          </button>
          <button
            onClick={ navigateLogin }
            data-testid="profile-logout-btn"
            className={ styles.buttons }
          >
            <img src={ logoutIcon } alt="logout" />
            <p className={ styles.logout }>Logout</p>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

// import Header from '../Header';
// import Footer from '../Footer';

// function Profile() {
//   return (
//     <div>
//       <Header tipo="Profile" />
//       <h1>Profile</h1>
//       <Footer />
//     </div>
//   );
// }
// export default Profile;
