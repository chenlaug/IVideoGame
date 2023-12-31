import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import FormAddCommentaire from '../Form/FormAddCommentaire';
import PropTypes from 'prop-types';

AddCommentaire.propTypes = {
  isOpenCommentaire: PropTypes.bool.isRequired,
  gameId: PropTypes.string,
  setIsOpenCommentaire: PropTypes.func,
  currentCommentaire: PropTypes.object,
};

/**
 * Composant `AddCommentaire` qui fournit une modal pour ajouter ou modifier un commentaire.
 * Affiche un formulaire `FormAddCommentaire` dans une modal, qui s'ouvre ou se ferme en fonction de l'état `isOpenCommentaire`.
 * La modal permet à l'utilisateur de saisir et de soumettre un commentaire.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.isOpenCommentaire - Indique si la modal doit être ouverte ou fermée.
 * @param {string} [props.gameId] - L'identifiant du jeu pour lequel le commentaire est ajouté ou modifié.
 * @param {Function} [props.setIsOpenCommentaire] - Fonction pour gérer l'état d'ouverture de la modal.
 * @param {Object} [props.currentCommentaire] - Les informations du commentaire actuel à modifier, s'il existe.
 * @returns {JSX.Element} Une modal contenant un formulaire pour l'ajout ou la modification d'un commentaire.
 */

export default function AddCommentaire({
  isOpenCommentaire,
  setIsOpenCommentaire,
  gameId,
  currentCommentaire,
}) {
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpenCommentaire} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setIsOpenCommentaire}
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
                onClick={() => setIsOpenCommentaire((prev) => !prev)}
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
                {t('Modal.addCommentaire')}
              </Dialog.Title>
              <FormAddCommentaire
                gameId={gameId}
                setIsOpenCommentaire={setIsOpenCommentaire}
                currentCommentaire={currentCommentaire}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
