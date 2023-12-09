import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BtnMain from '../Btn/BtnMain';
import BtnNavLink from '../Btn/BtnNavLink';
import InputMain from '../Input/InputMain';
import BtnShowPasword from '../Btn/BtnShowPasword';
import PropTypes from 'prop-types';

FormNewPassword.propTypes = {
  setNewPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

/**
 * Composant `FormNewPassword` qui fournit un formulaire pour la réinitialisation du mot de passe.
 * Le formulaire permet à l'utilisateur de saisir un nouveau mot de passe et de le confirmer.
 * Il intègre également un bouton pour afficher ou cacher le mot de passe.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.setNewPassword - Fonction pour définir le nouveau mot de passe.
 * @param {Function} props.setConfirmPassword - Fonction pour définir la confirmation du mot de passe.
 * @param {Function} props.handleSubmit - Fonction à exécuter lors de la soumission du formulaire.
 * @returns {JSX.Element} Un formulaire pour saisir et confirmer un nouveau mot de passe, avec une option pour afficher ou masquer le mot de passe.
 */

export default function FormNewPassword({
  setNewPassword,
  setConfirmPassword,
  handleSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="mt-8 space-y-6 px-6 pt-6 pb-8" onSubmit={handleSubmit}>
      <div className="rounded-md">
        <div>
          <InputMain
            onChange={(e) => setNewPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            label={t('input.label.newPassword')}
            placeholder={t('input.placeholder.newPassword')}
            id="password"
          />
        </div>
        <div>
          <InputMain
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            label={t('input.label.confirmPassword')}
            placeholder={t('input.placeholder.confirmPassword')}
            id="confirm-password"
          />
        </div>
        <div className="text-center mt-2">
          <BtnShowPasword showPassword={showPassword} action={handlePassword} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="mr-2">
          <BtnMain label={t('Button.resetPassword')} type="submit" />
        </div>
        <BtnNavLink link="/" label={t('Button.comeback')} />
      </div>
    </form>
  );
}
