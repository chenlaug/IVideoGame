import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import api from '../../Utils/api';
import InputMain from '../Input/InputMain';
import BtnMain from '../Btn/BtnMain';
import PropTypes from 'prop-types';

FormAddDeveloppeur.propTypes = {
  setIsOpenAddDeveloppeur: PropTypes.func.isRequired,
  CurrentDeveloppeur: PropTypes.object,
};

/**
 * Composant `FormAddDeveloppeur` qui fournit un formulaire pour ajouter ou mettre à jour les informations d'un développeur.
 * Le formulaire permet de saisir le nom, le pays et le site web du développeur.
 * Selon qu'un développeur existant est fourni ou non, le formulaire servira à la création ou à la mise à jour des informations.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.setIsOpenAddDeveloppeur - Fonction pour gérer l'état d'ouverture du formulaire.
 * @param {Object} [props.CurrentDeveloppeur] - Les informations du développeur actuel à mettre à jour, s'il existe.
 * @returns {JSX.Element} Le formulaire pour ajouter ou mettre à jour les informations d'un développeur.
 */

export default function FormAddDeveloppeur({
  setIsOpenAddDeveloppeur,
  CurrentDeveloppeur,
}) {
  const [nom, setNom] = useState(
    CurrentDeveloppeur ? CurrentDeveloppeur.nom : ''
  );
  const [pays, setPays] = useState(
    CurrentDeveloppeur ? CurrentDeveloppeur.pays : ''
  );
  const [siteWeb, setSiteWeb] = useState(
    CurrentDeveloppeur ? CurrentDeveloppeur.siteWeb : ''
  );
  const { t } = useTranslation();

  const authHeader = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t('toast.loading'));

    const data = {
      nom,
      pays,
      siteWeb,
    };

    try {
      if (CurrentDeveloppeur) {
        // Si CurrentDeveloper est défini, met à jour l'utilisateur
        await api.put(
          `/developpeur/updateDeveloppeur/${CurrentDeveloppeur._id}`,
          data,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
      } else {
        // Si CurrentDeveloppeur n'est pas défini, créez un nouvel utilisateur
        await api.post('/developpeur/createDeveloppeur', data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      }

      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      setIsOpenAddDeveloppeur(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error'));
    }
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        type="text"
        label={t('input.label.developerTeamName')}
        placeholder={t('input.placeholder.developerTeamName')}
        id="nom"
      />

      <InputMain
        value={pays}
        onChange={(e) => setPays(e.target.value)}
        type="text"
        label={t('input.label.country')}
        placeholder={t('input.placeholder.country')}
        id="pays"
      />

      <InputMain
        value={siteWeb}
        onChange={(e) => setSiteWeb(e.target.value)}
        type="text"
        label={t('input.label.developmentWebsite')}
        placeholder={t('input.placeholder.developmentWebsite')}
        id="siteWeb"
      />

      <BtnMain
        label={
          CurrentDeveloppeur
            ? t('Button.editingDeveloper')
            : t('Button.creatingDeveloper')
        }
        type="submit"
      />
      <Toaster />
    </form>
  );
}
