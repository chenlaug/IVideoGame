import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import api from '../../Utils/api';
import InputMain from '../Input/InputMain';
import BtnMain from '../Btn/BtnMain';
import PropTypes from 'prop-types';

FormAddCommentaire.propTypes = {
  gameId: PropTypes.string,
  setIsOpenCommentaire: PropTypes.func.isRequired,
  currentCommentaire: PropTypes.object,
};

/**
 * Composant `FormAddCommentaire` qui fournit un formulaire pour ajouter ou mettre à jour un commentaire.
 * Le formulaire permet à l'utilisateur de saisir une note et un contenu pour le commentaire.
 * Selon le contexte, ce formulaire peut être utilisé pour créer un nouveau commentaire ou mettre à jour un commentaire existant.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string} [props.gameId] - L'identifiant du jeu pour lequel le commentaire est ajouté ou mis à jour.
 * @param {Function} props.setIsOpenCommentaire - Fonction pour gérer l'état d'ouverture du formulaire.
 * @param {Object} [props.currentCommentaire] - Le commentaire actuel à mettre à jour, s'il existe.
 * @returns {JSX.Element} Le formulaire pour ajouter ou mettre à jour un commentaire.
 */

export default function FormAddCommentaire({
  gameId,
  setIsOpenCommentaire,
  currentCommentaire,
}) {
  const { t } = useTranslation();
  const [note, setNote] = useState(
    currentCommentaire ? currentCommentaire.note : ''
  );
  const [contenu, setContenu] = useState(
    currentCommentaire ? currentCommentaire.contenu : ''
  );

  const authHeader = useAuthHeader();
  const handleCreate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t('toast.error'));
    try {
      const data = {
        note,
        contenu,
      };
      await api.post(`/comments/addComments/${gameId}`, data, {
        headers: {
          Authorization: authHeader(),
        },
      });
      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      setIsOpenCommentaire(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error'));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t('toast.loading'));
    try {
      const data = {
        note,
        contenu,
      };
      await api.put(`/comments/updateComment/${currentCommentaire._id}`, data, {
        headers: {
          Authorization: authHeader(),
        },
      });
      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      setIsOpenCommentaire(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error'));
    }
  };

  const handleSubmit = (e) => {
    if (currentCommentaire) {
      handleUpdate(e);
    } else {
      handleCreate(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputMain
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          type="text"
          label={t('input.label.Content')}
          placeholder={t('input.placeholder.Content')}
          id="description"
        />

        <InputMain
          value={note}
          onChange={(e) => setNote(e.target.value)}
          type="number"
          label={t('input.label.score')}
          placeholder={t('input.placeholder.score')}
          max={10}
          min={0}
          id="note"
        />
        <div className="mt-5">
          <BtnMain label={t('Modal.createCommentaire')} type="submit" />
        </div>
      </form>
      <Toaster />
    </>
  );
}
