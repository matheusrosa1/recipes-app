import Header from '../Header';
import Footer from '../Footer';
import Recipes from '../../pages/Recipes';

function Meals() {
  return (
    <div className="meals">
      <Header tipo="Meals" />
      <Recipes
        type="Meals"
      />
      <Footer />
    </div>
  );
}
export default Meals;
