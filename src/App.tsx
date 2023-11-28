import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import MealsId from './components/MealsId';
import DrinksId from './components/DrinksId';
import MealsInProgress from './components/MealsInProgress';
import DrinksInProgress from './components/DrinksInProgress';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipesProvider from './context/RecipesProviders';

function App() {
  return (
  /*     <RecipesProvider> */
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/meals/:id" element={ <MealsId /> } />
      <Route path="/drinks/:id" element={ <DrinksId /> } />
      <Route path="/meals/:id/in-progress" element={ <MealsInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <DrinksInProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  /*     </RecipesProvider> */
  );
}

export default App;
