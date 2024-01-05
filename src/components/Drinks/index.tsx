import Header from '../Header';
import Footer from '../Footer';
import Recipes from '../../pages/Recipes';

function Drinks() {
  return (
    <div>
      <Header tipo="Drinks" />
      <Recipes type="Drinks" />
      <Footer />
    </div>
  );
}
export default Drinks;
