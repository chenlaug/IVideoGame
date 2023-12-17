import { useTranslation } from 'react-i18next';
import BtnMain from '../Btn/BtnMain';
import InputMain from '../Input/InputMain';
import PropTypes from 'prop-types';

Searchbar.propTypes = {
  query: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
};

/**
 * Composant `Searchbar` qui fournit une barre de recherche.
 * Permet à l'utilisateur de saisir une requête de recherche et de soumettre une fonction de recherche.
 * Utilise un champ de saisie (`InputMain`) pour la requête et un bouton (`BtnMain`) pour déclencher la recherche.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string} props.query - La requête de recherche actuelle.
 * @param {Function} props.handleSearch - Fonction appelée lorsque l'utilisateur saisit une nouvelle requête ou soumet une recherche.
 * @returns {JSX.Element} Une barre de recherche avec un champ de saisie et un bouton de recherche.
 */

export default function Searchbar({ query, handleSearch }) {
  const { t } = useTranslation();
  return (
    <form className="w-full sm:w-3/4 lg:w-1/2 xl:max-w-lg mx-auto">
      <div className="flex items-center border-b-2 border-light-Yellow py-2">
        <InputMain
          value={query}
          onChange={handleSearch}
          type="text"
          placeholder={t('input.placeholder.searchUser')}
          className="flex-grow"
        />

        <BtnMain
          label={t('Button.search')}
          type="button"
          className="whitespace-nowrap"
        />
      </div>
    </form>
  );
}
