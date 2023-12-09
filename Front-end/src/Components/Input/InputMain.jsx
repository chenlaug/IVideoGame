import PropTypes from 'prop-types';

InputMain.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  currentCommentaire: PropTypes.object,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
};

/**
 * Composant `InputMain` qui crée un champ de saisie standard pour les formulaires.
 * Ce composant permet de recueillir des entrées de l'utilisateur, telles que le texte, les numéros, etc.
 * Il peut être configuré avec différentes propriétés telles que le type, le label, le placeholder, la valeur maximale et minimale.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string} props.value - La valeur actuelle du champ de saisie.
 * @param {Function} props.onChange - Fonction à exécuter lorsque la valeur du champ change.
 * @param {string} [props.type] - Le type de champ (par exemple, 'text', 'email', 'number').
 * @param {string} [props.label] - Le libellé associé au champ.
 * @param {string} [props.placeholder] - Le texte d'indication (placeholder) affiché dans le champ.
 * @param {string} [props.id] - L'identifiant unique du champ.
 * @param {number} [props.max] - La valeur maximale pour les champs de type 'number'.
 * @param {number} [props.min] - La valeur minimale pour les champs de type 'number'.
 * @returns {JSX.Element} Un composant de champ de saisie pour les formulaires.
 */

export default function InputMain({
  value,
  onChange,
  type,
  label,
  placeholder,
  id,
  max,
  min,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-light-TBlack dark:text-dark-TWhite"
      >
        {label}
      </label>
      <input
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-light-White dark:text-dark-TWhite shadow-sm bg-light-VCBlackGray dark:bg-dark-VCBlack border-gray-300 rounded-md"
        id={id}
        type={type}
        max={max}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </>
  );
}
