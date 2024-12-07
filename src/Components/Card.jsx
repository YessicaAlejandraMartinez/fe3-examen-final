import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useGlobalContext } from './utils/global.context';
const Card = ({ dentist, isFavorite, onRemoveFavorite }) => {
  const { addFavorite } = useGlobalContext();
  const { theme } = useGlobalContext().state;
  const handleAddFavorite = () => {
    addFavorite(dentist);
  };

  const handleRemoveFavorite = () => {
    onRemoveFavorite(dentist);
  };

  return (
    <div className={`card ${theme === 'dark' ? 'card--dark' : ''}`}>
      <Link to={`/dentist/${dentist.id}`}>
        <div className="card__image-container">
          <img className="card__image" src="../../public/images/doctor.jpg" alt="Doctor" />
        </div>
        <h3 className="card__title">{dentist.name}</h3>
        <p className="card__info">{dentist.username}</p>
        <p className="card__info">ID: {dentist.id}</p>
      </Link>
      {isFavorite ? (
        <button className="card__button card__button--remove" onClick={handleRemoveFavorite}>
          Eliminar de Favorito
        </button>
      ) : (
        <button className="card__button card__button--add" onClick={handleAddFavorite}>
          Agregar a Favorito
        </button>
      )}
    </div>
  );
};

Card.propTypes = {
  dentist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
  isFavorite: PropTypes.bool,
  onRemoveFavorite: PropTypes.func
};

export default Card;
