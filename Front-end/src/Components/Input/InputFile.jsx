import PropTypes from 'prop-types';

InputFile.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  currentCommentaire: PropTypes.object,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

/**
 * Composant `InputFile` qui crée un champ de saisie pour les fichiers.
 * Ce champ permet à l'utilisateur de sélectionner un fichier à partir de son appareil.
 * Il peut être utilisé pour des formulaires nécessitant un téléchargement de fichier, comme l'upload d'images ou de documents.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string} [props.label] - Le libellé du champ de saisie.
 * @param {string} props.id - L'identifiant unique pour le champ de saisie et son label.
 * @param {boolean} props.required - Indique si le champ est requis pour la soumission du formulaire.
 * @param {Function} props.onChange - Fonction à exécuter lorsque l'utilisateur sélectionne un fichier.
 * @returns {JSX.Element} Un composant de champ de saisie pour les fichiers avec un label.
 */

export default function InputFile({ label, id, required, onChange }) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border-gray-300"
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
