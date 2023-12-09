import BtnMain from '../Btn/BtnMain';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

FormDelete.propTypes = {
  no: PropTypes.func.isRequired,
  yes: PropTypes.func.isRequired,
};

/**
 * Composant `FormDelete` qui affiche une confirmation de suppression.
 * Il propose deux boutons, "Oui" et "Non", pour permettre à l'utilisateur de confirmer ou d'annuler l'action de suppression.
 * Les actions à exécuter pour chacun des boutons sont passées en tant que props.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.no - Fonction à exécuter lorsque l'utilisateur clique sur "Non".
 * @param {Function} props.yes - Fonction à exécuter lorsque l'utilisateur clique sur "Oui".
 * @returns {JSX.Element} Une interface utilisateur pour la confirmation de suppression avec des boutons pour confirmer ou annuler.
 */

export default function FormDelete({ no, yes }) {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('Modal.DeletionConfirmation')}</h2>
      <div className="flex justify-center space-x-5">
        <BtnMain label={t('text.yes')} type="button" onClick={yes} />
        <BtnMain label={t('text.no')} type="button" onClick={no} />
      </div>
    </>
  );
}
