import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import api from '../../Utils/api';
import { useTranslation } from 'react-i18next';
import InputMain from '../Input/InputMain';
import BtnMain from '../Btn/BtnMain';
import PropTypes from 'prop-types';

FormAddEditeur.propTypes = {
  setIsOpenAddEditeur: PropTypes.func.isRequired,
  CurrentEditeur: PropTypes.object,
};

/**
 * Composant `FormAddEditeur` qui fournit un formulaire pour ajouter ou mettre à jour les informations d'un éditeur.
 * Le formulaire permet de saisir le nom, le pays et le site web de l'éditeur.
 * Selon qu'un éditeur existant est fourni ou non, le formulaire servira à la création ou à la mise à jour des informations.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.setIsOpenAddEditeur - Fonction pour gérer l'état d'ouverture du formulaire.
 * @param {Object} [props.CurrentEditeur] - Les informations de l'éditeur actuel à mettre à jour, s'il existe.
 * @returns {JSX.Element} Le formulaire pour ajouter ou mettre à jour les informations d'un éditeur.
 */

export default function FormAddEditeur({
  setIsOpenAddEditeur,
  CurrentEditeur,
}) {
  const [nom, setNom] = useState(CurrentEditeur ? CurrentEditeur.nom : '');
  const [pays, setPays] = useState(CurrentEditeur ? CurrentEditeur.pays : '');
  const [siteWeb, setSiteWeb] = useState(
    CurrentEditeur ? CurrentEditeur.siteWeb : ''
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
      if (CurrentEditeur) {
        // If CurrentEditeur is defined, update the user
        await api.put(`/editeur/updateEditeur/${CurrentEditeur._id}`, data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      } else {
        // If CurrentEditeur is undefined, create a new user
        await api.post('/editeur/createEditeur', data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      }

      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      setIsOpenAddEditeur(false);
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
        label={t('input.label.developerPublishe')}
        placeholder={t('input.placeholder.developerPublishe')}
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
        label={t('input.label.PublisherWebsite')}
        placeholder={t('input.placeholder.PublisherWebsite')}
        id="siteWeb"
      />

      <BtnMain
        label={
          CurrentEditeur
            ? t('Button.editingEditor')
            : t('Button.creatingEditor')
        }
        type="submit"
      />
      <Toaster />
    </form>
  );
}
