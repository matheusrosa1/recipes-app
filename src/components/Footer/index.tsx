import { useNavigate } from 'react-router-dom';
import drinkImage from '../../images/drinkIcon.svg';
import mealImage from '../../images/mealIcon.svg';
import './index.css';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer data-testid="footer">
      <button onClick={ () => navigate('/drinks') }>
        <img
          src={ drinkImage }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img
          src={ mealImage }
          alt="drink"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
