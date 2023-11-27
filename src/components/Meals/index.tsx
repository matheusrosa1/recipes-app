import Header from '../Header';
import Footer from '../Footer';
import Recipes from '../Recipes';

function Meals() {
  return (
    <div>
      <Header tipo="Meals" />
      <h1>Meals</h1>
      <Recipes />
      <Footer />
    </div>
  );
}
export default Meals;
