import PropTypes from 'prop-types';

BtnMain.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

/**
 * Composant `BtnMain` qui affiche un bouton personnalisable.
 * Ce composant accepte un label, un type de bouton et une fonction onClick en tant que props.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string|Object} props.label - Le texte ou l'élément JSX à afficher comme contenu du bouton.
 * @param {string} props.type - Le type de bouton (ex: 'button', 'submit', 'reset').
 * @param {Function} [props.onClick] - La fonction à exécuter lorsque le bouton est cliqué (facultatif).
 * @returns {JSX.Element} Un élément bouton JSX.
 */

export default function BtnMain({ label, type, onClick }) {
  return (
    <button
      type={type}
      className="px-4 py-2 text-center font-medium text-light-TBleu bg-light-Yellow hover:bg-light-VCYellow border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
