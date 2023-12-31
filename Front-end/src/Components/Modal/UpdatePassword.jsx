import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import FormUpdatePwd from '../Form/FormUpdatePwd';
import PropTypes from 'prop-types';

UpdatePassword.propTypes = {
  isOpenUpdatePwd: PropTypes.bool.isRequired,
  setIsOpenUpdatePwd: PropTypes.func.isRequired,
  CurrentUser: PropTypes.object,
};

/**
 * Composant `UpdatePassword` qui affiche une modal pour mettre à jour le mot de passe d'un utilisateur.
 * Utilise le composant `FormUpdatePwd` pour permettre à l'utilisateur de saisir son nouveau mot de passe.
 * La modal s'affiche ou se ferme en fonction de l'état `isOpenUpdatePwd`.
 * En cas de confirmation, le mot de passe de l'utilisateur est mis à jour via une requête API.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.isOpenUpdatePwd - Indique si la modal doit être ouverte ou fermée.
 * @param {Function} props.setIsOpenUpdatePwd - Fonction pour gérer l'état d'ouverture de la modal.
 * @param {Object} [props.CurrentUser] - Les informations de l'utilisateur actuel à modifier, s'il existe.
 * @returns {JSX.Element} Une modal contenant un formulaire pour la mise à jour du mot de passe d'un utilisateur.
 */

export default function UpdatePassword({
  isOpenUpdatePwd,
  setIsOpenUpdatePwd,
  CurrentUser,
}) {
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpenUpdatePwd} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setIsOpenUpdatePwd}
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
                onClick={() => setIsOpenUpdatePwd((prev) => !prev)}
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
                {t('Modal.changePassword')}
              </Dialog.Title>
              <FormUpdatePwd
                setIsOpenUpdatePwd={setIsOpenUpdatePwd}
                CurrentUser={CurrentUser}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
