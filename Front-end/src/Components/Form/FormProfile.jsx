import { useTranslation } from 'react-i18next';
import InputMain from '../Input/InputMain';
import BtnMain from '../Btn/BtnMain';
import PropTypes from 'prop-types';

FormProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired,
  birthday: PropTypes.string.isRequired,
  setBirthday: PropTypes.func.isRequired,
  handleEditMode: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

/**
 * Composant `FormProfile` qui fournit un formulaire pour la modification du profil utilisateur.
 * Le formulaire permet à l'utilisateur de mettre à jour son prénom, nom, email, téléphone, et date de naissance.
 * Inclut également des boutons pour sauvegarder les modifications ou annuler et revenir à l'état précédent.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string} props.firstName - Prénom de l'utilisateur.
 * @param {Function} props.setFirstName - Fonction pour mettre à jour le prénom.
 * @param {string} props.lastName - Nom de l'utilisateur.
 * @param {Function} props.setLastName - Fonction pour mettre à jour le nom.
 * @param {string} props.email - Email de l'utilisateur.
 * @param {Function} props.setEmail - Fonction pour mettre à jour l'email.
 * @param {string} props.phone - Numéro de téléphone de l'utilisateur.
 * @param {Function} props.setPhone - Fonction pour mettre à jour le téléphone.
 * @param {string} props.birthday - Date de naissance de l'utilisateur.
 * @param {Function} props.setBirthday - Fonction pour mettre à jour la date de naissance.
 * @param {Function} props.handleEditMode - Fonction pour gérer le mode d'édition du formulaire.
 * @param {Function} props.handleUpdate - Fonction appelée lors de la soumission du formulaire pour mettre à jour les informations de l'utilisateur.
 * @returns {JSX.Element} Un formulaire pour modifier les informations du profil utilisateur.
 */

export default function FormProfile({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  birthday,
  setBirthday,
  handleEditMode,
  handleUpdate,
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleUpdate} className="px-6 pt-6 pb-8">
      <InputMain
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        label={t('input.label.firstName')}
        placeholder={t('input.placeholder.firstName')}
        id="prenom"
      />

      <InputMain
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        label={t('input.label.nom')}
        placeholder={t('input.placeholder.nom')}
        id="nom"
      />

      <InputMain
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        label={t('input.label.email')}
        placeholder={t('input.placeholder.email')}
        id="email"
      />

      <InputMain
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        label={t('input.label.phone')}
        placeholder={t('input.placeholder.phone')}
        id="telephone"
      />

      <InputMain
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        type="date"
        label={t('input.label.birthday')}
        placeholder={t('input.placeholder.birthday')}
        id="birthday"
      />

      <div className="flex items-center justify-center gap-2 mt-2">
        <BtnMain label={t('Button.save')} type="submit" />
        <BtnMain
          label={t('Button.Cancel')}
          type="submit"
          onClick={handleEditMode}
        />
      </div>
    </form>
  );
}
