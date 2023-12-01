import { Button } from '../Forms/Button';

function RecipeInProgress() {
  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src="alguma caminho"
          alt="alguma coisa"
        />
        <h2
          data-testid="recipe-title"
        >
          Título da receita
        </h2>
        <h3>Ingredientes:</h3>
        <p data-testid="recipe-category">Categoria</p>
        <h2
          data-testid="instructions"
        >
          Intruções
        </h2>
      </div>
      <Button
        dataTestId="share-btn"
        buttonLabel="Compartilhar"
        onClick={ () => {} }
      />
      <Button
        dataTestId="favorite-btn"
        buttonLabel="Favoritar"
        onClick={ () => {} }
      />
      <Button
        dataTestId="finish-recipe-btn"
        buttonLabel="Finalizar"
        onClick={ () => {} }
      />
    </div>
  );
}
export default RecipeInProgress;
