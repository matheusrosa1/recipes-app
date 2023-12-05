import Header from '../Header';
import Footer from '../Footer';
import Recipes from '../../pages/Recipes';

function Meals() {
  return (
    <div className="meals">
      <Header tipo="Meals" />
      <h1 className="title">Meals</h1>
      <Recipes />
      <Footer />
    </div>
  );
}
export default Meals;
