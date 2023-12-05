import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

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
      <h2>Perfil</h2>
      <h1 data-testid="profile-email">{email}</h1>
      <button onClick={ navigateDoneRecipes } data-testid="profile-done-btn">
        Done Recipes
      </button>
      <button onClick={ navigateFavorite } data-testid="profile-favorite-btn">
        Favorite Recipes
      </button>
      <button onClick={ navigateLogin } data-testid="profile-logout-btn">
        Logout
      </button>
      <Footer />
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
