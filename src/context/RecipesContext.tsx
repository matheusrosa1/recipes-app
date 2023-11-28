import { createContext } from 'react';

export type RecipesContextType = any;

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
