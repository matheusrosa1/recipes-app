import { useNavigate } from 'react-router-dom';
import './index.css';
import styles from './footer.module.css';
import mealIcon from '../../images/icone-prato.svg';
import drinkIcon from '../../images/icone-prato (1).svg';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer data-testid="footer" className={ styles.footer }>
      <button
        onClick={ () => navigate('/drinks') }
        className={ styles.buttonWithoutBorder }
      >
        <img
          src={ drinkIcon }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        onClick={ () => navigate('/meals') }
        className={ styles.buttonWithoutBorder }
      >
        <img
          src={ mealIcon }
          alt="drink"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
