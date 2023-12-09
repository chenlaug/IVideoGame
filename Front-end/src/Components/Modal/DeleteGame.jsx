import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import api from '../../Utils/api';
import FormDelete from '../Form/FormDelete';
import PropTypes from 'prop-types';

DeleteGame.propTypes = {
  isOpenDelete: PropTypes.bool.isRequired,
  setIsOpenDelete: PropTypes.func,
  idGame: PropTypes.string,
  listeGame: PropTypes.array,
  setListeGame: PropTypes.func,
};

/**
 * Composant `DeleteGame` qui affiche une modal pour confirmer la suppression d'un jeu vidéo.
 * Utilise le composant `FormDelete` pour permettre à l'utilisateur de confirmer ou d'annuler la suppression.
 * La modal s'affiche ou se ferme en fonction de l'état `isOpenDelete`.
 * En cas de confirmation, le jeu est supprimé via une requête API et la liste des jeux est mise à jour.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.isOpenDelete - Indique si la modal doit être ouverte ou fermée.
 * @param {Function} [props.setIsOpenDelete] - Fonction pour gérer l'état d'ouverture de la modal.
 * @param {string} [props.idGame] - L'identifiant du jeu à supprimer.
 * @param {Array} [props.listeGame] - Liste des jeux actuels.
 * @param {Function} [props.setListeGame] - Fonction pour mettre à jour la liste des jeux.
 * @returns {JSX.Element} Une modal contenant un formulaire de confirmation pour la suppression d'un jeu vidéo.
 */

export default function DeleteGame({
  isOpenDelete,
  setIsOpenDelete,
  idGame,
  listeGame,
  setListeGame,
}) {
  const authHeader = useAuthHeader();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t('toast.loading'));
    try {
      await api.delete(`/videoGame/deleteGame/${idGame}`, {
        headers: {
          Authorization: authHeader(),
        },
      });
      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      setListeGame(
        listeGame.filter((listeVideoGame) => listeVideoGame._id !== idGame)
      );
      setIsOpenDelete(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error'));
    }
  };

  return (
    <>
      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsOpenDelete}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setIsOpenDelete(false)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {t('Modal.DeletionConfirmation')}
                </Dialog.Title>
                <FormDelete
                  no={() => setIsOpenDelete(false)}
                  yes={handleSubmit}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Toaster />
    </>
  );
}
