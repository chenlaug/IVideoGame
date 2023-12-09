import PropTypes from "prop-types";

TextareaMain.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

/**
 * Le composant `TextareaMain` représente un champ de saisie de texte multiligne personnalisé.
 * Utilisé pour saisir des textes plus longs comme des commentaires ou des descriptions.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.label - Le label du champ textarea.
 * @param {string} props.id - L'identifiant unique pour le champ textarea.
 * @param {Function} props.onChange - La fonction appelée à chaque modification du champ.
 * @param {string} props.value - La valeur actuelle du champ textarea.
 * @param {string} props.placeholder - Le texte indicatif qui s'affiche lorsque le champ est vide.
 * @returns {JSX.Element} - Un composant représentant un champ de saisie multiligne.
 */

export default function TextareaMain({
  label,
  id,
  onChange,
  value,
  placeholder,
}) {
  return (
    <>
      <label
        className="block text-light-TBlack dark:text-dark-TWhite text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className=" appearance-none border rounded w-full py-2 px-3 text-light-White dark:text-dark-TWhite shadow-sm bg-light-VCBlackGray dark:bg-dark-VCBlack leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}
