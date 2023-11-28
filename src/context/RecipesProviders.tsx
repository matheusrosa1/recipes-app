import RecipesContext from './RecipesContext';

type RecipesProviderProps = {
  children: React.ReactNode
};

function RecipesProvider({ children }: RecipesProviderProps) {
  return (
    <RecipesContext.Provider value={ }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
