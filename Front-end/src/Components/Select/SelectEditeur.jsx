import { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import api from '../../Utils/api';
import PropTypes from 'prop-types';

SelectEditeur.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

/**
 * Composant `SelectEditeur` qui fournit une liste déroulante des éditeurs.
 * Charge les options des éditeurs depuis une API et les affiche dans un menu déroulant.
 * Permet à l'utilisateur de sélectionner un éditeur à partir de la liste.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.onChange - Fonction appelée lorsque l'utilisateur sélectionne un éditeur dans la liste.
 * @param {string} props.value - La valeur actuelle sélectionnée pour l'éditeur.
 * @returns {JSX.Element} Un composant de sélection avec des options dynamiquement chargées pour les éditeurs.
 */

export default function SelectEditeur({ onChange, value }) {
  const authHeader = useAuthHeader();
  const [editeurs, setEditeurs] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get('/editeur/getEditeurs', {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then(
        (res) => {
          setEditeurs(res.data);
        } // Ajouter cette ligne pour le débogage
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <label className="mt-2 block text-sm font-medium text-gray-700">
        {t('input.label.Release')}
      </label>
      <select
        onChange={onChange}
        value={value}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      >
        <option value="">{t('input.placeholder.Release')}</option>
        {editeurs.map((editeur) => (
          <option key={editeur._id} value={editeur._id}>
            {editeur.nom}
          </option>
        ))}
      </select>
    </>
  );
}
