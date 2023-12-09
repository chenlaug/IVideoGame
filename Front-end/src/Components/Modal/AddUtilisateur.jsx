import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FormAddUtilisateur from '../Form/FormAddUtilisateur';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

AddUtilisateur.propTypes = {
  isOpenAddUser: PropTypes.bool.isRequired,
  setIsOpenAddUser: PropTypes.func,
  CurrentUser: PropTypes.object,
};

/**
 * Composant `AddUtilisateur` qui affiche une modal pour ajouter ou modifier les informations d'un utilisateur.
 * Utilise le composant `FormAddUtilisateur` pour permettre à l'utilisateur de saisir ou de modifier ses informations.
 * La modal s'affiche ou se ferme en fonction de l'état `isOpenAddUser`.
 * Peut être utilisé pour créer un nouvel utilisateur ou éditer les informations d'un utilisateur existant.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.isOpenAddUser - Indique si la modal doit être ouverte ou fermée.
 * @param {Function} [props.setIsOpenAddUser] - Fonction pour gérer l'état d'ouverture de la modal.
 * @param {Object} [props.CurrentUser] - Les informations de l'utilisateur actuel à modifier, s'il existe.
 * @returns {JSX.Element} Une modal contenant un formulaire pour l'ajout ou la modification des informations d'un utilisateur.
 */

export default function AddUtilisateur({
  isOpenAddUser,
  setIsOpenAddUser,
  CurrentUser,
}) {
  const { t } = useTranslation();
  return (
    <Transition appear show={isOpenAddUser} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setIsOpenAddUser}
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
                onClick={() => setIsOpenAddUser(false)}
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
                {CurrentUser ? t('Modal.editingUser') : t('Modal.addUser')}
              </Dialog.Title>
              <FormAddUtilisateur
                setIsOpenDeleteCommentaire={setIsOpenAddUser}
                CurrentUser={CurrentUser}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
