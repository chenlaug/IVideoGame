import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import api from '../../Utils/api';
import FormDelete from '../Form/FormDelete';
import PropTypes from 'prop-types';

DeleteFavorisGames.propTypes = {
  isOpenDeleteFavoris: PropTypes.bool.isRequired,
  setIsOpenDeleteFavoris: PropTypes.func,
  setListeFavorisGames: PropTypes.func,
  listeFavorisGames: PropTypes.array,
  idGameFavori: PropTypes.string,
};

/**
 * Composant `DeleteFavorisGames` qui affiche une modal pour confirmer la suppression d'un jeu des favoris.
 * Utilise le composant `FormDelete` pour permettre à l'utilisateur de confirmer ou d'annuler la suppression.
 * La modal s'affiche ou se ferme en fonction de l'état `isOpenDeleteFavoris`.
 * En cas de confirmation, le jeu est supprimé des favoris via une requête API et la liste des favoris est mise à jour.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.isOpenDeleteFavoris - Indique si la modal doit être ouverte ou fermée.
 * @param {Function} [props.setIsOpenDeleteFavoris] - Fonction pour gérer l'état d'ouverture de la modal.
 * @param {Function} [props.setListeFavorisGames] - Fonction pour mettre à jour la liste des jeux favoris.
 * @param {Array} [props.listeFavorisGames] - Liste des jeux favoris actuels.
 * @param {string} [props.idGameFavori] - L'identifiant du jeu à supprimer des favoris.
 * @returns {JSX.Element} Une modal contenant un formulaire de confirmation pour la suppression d'un jeu des favoris.
 */

export default function DeleteFavorisGames({
  isOpenDeleteFavoris,
  setIsOpenDeleteFavoris,
  setListeFavorisGames,
  listeFavorisGames,
  idGameFavori,
}) {
  const authHeader = useAuthHeader();
  const { t } = useTranslation();
  const deleteFromFavorites = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t('toast.error'));

    try {
      await api.delete(`/user/removeGameFromFavorites/${idGameFavori}`, {
        headers: {
          Authorization: authHeader(),
        },
      });
      toast.dismiss(loadingToast);
      toast.success(t('toast.success'));
      // Mettre à jour la liste des favoris dans l'état après suppression
      setListeFavorisGames(
        listeFavorisGames.filter((game) => game._id !== idGameFavori)
      );
      setIsOpenDeleteFavoris((prev) => !prev);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error'));
    }
  };

  return (
    <>
      <Transition appear show={isOpenDeleteFavoris} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsOpenDeleteFavoris}
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
                  onClick={() => setIsOpenDeleteFavoris((prev) => !prev)}
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
                  {t('Modal.deleteGamefavoris')}
                </Dialog.Title>
                <FormDelete
                  no={() => setIsOpenDeleteFavoris((prev) => !prev)}
                  yes={deleteFromFavorites}
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
