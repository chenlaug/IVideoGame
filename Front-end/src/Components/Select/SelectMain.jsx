import PropTypes from "prop-types";

SelectMain.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
};

/**
 * Composant `SelectMain` qui fournit une liste déroulante générique.
 * Affiche une liste d'options passées en props et permet à l'utilisateur de sélectionner une option.
 * Utilise un label et un placeholder pour améliorer l'accessibilité et l'expérience utilisateur.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string} props.label - Le label associé au menu déroulant.
 * @param {string} props.id - L'identifiant unique pour le menu déroulant.
 * @param {Function} props.onChange - Fonction appelée lorsque l'utilisateur sélectionne une option.
 * @param {string} props.value - La valeur actuellement sélectionnée dans le menu déroulant.
 * @param {Array} props.options - Tableau d'objets représentant les options disponibles.
 * @param {string} props.placeholder - Texte d'indication affiché lorsqu'aucune valeur n'est sélectionnée.
 * @returns {JSX.Element} Un composant de sélection avec des options dynamiquement chargées.
 */

export default function SelectMain({
  label,
  id,
  onChange,
  value,
  options,
  placeholder,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        id={id}
        value={value}
        onChange={onChange}
        required
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
