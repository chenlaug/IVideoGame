import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
};

/**
 * Composant `BackButton` pour naviguer vers la page précédente.
 * Utilise React Router pour gérer la navigation.
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.label - Texte à afficher sur le bouton.
 * @returns {JSX.Element} - Un élément JSX représentant un bouton de retour.
 */

export default function BackButton({ label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state && location.state.from;

  const handleClick = () => {
    if (previousLocation) {
      navigate(previousLocation);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className="px-4 py-2 text-center font-medium text-light-TBleu bg-light-Yellow hover:bg-light-VCYellow border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
