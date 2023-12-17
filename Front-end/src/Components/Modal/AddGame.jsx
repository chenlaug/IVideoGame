import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import FormAddGame from '../Form/FormAddGame';
import PropTypes from 'prop-types';

AddGame.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  listeGame: PropTypes.array.isRequired,
  setListeGame: PropTypes.func.isRequired,
  currentGame: PropTypes.array,
  setVersion: PropTypes.func.isRequired,
};

/**
 * Composant `AddGame` qui affiche une modal pour ajouter ou modifier les informations d'un jeu vidéo.
 * Utilise le composant `FormAddGame` pour permettre à l'utilisateur de saisir les informations du jeu.
 * La modal s'affiche ou se ferme en fonction de l'état `isOpen`.
 * Peut être utilisé pour créer un nouveau jeu ou éditer les informations d'un jeu existant.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.isOpen - Indique si la modal doit être ouverte ou fermée.
 * @param {Function} props.setIsOpen - Fonction pour gérer l'état d'ouverture de la modal.
 * @param {Array} props.listeGame - Liste des jeux à mettre à jour après la création ou la modification d'un jeu.
 * @param {Function} props.setListeGame - Fonction pour mettre à jour la liste des jeux.
 * @param {Object} [props.currentGame] - Les informations du jeu actuel à modifier, s'il existe.
 * @returns {JSX.Element} Une modal contenant un formulaire pour l'ajout ou la modification des informations d'un jeu vidéo.
 */

export default function AddGame({
  isOpen,
  setIsOpen,
  listeGame,
  setListeGame,
  currentGame,
  setVersion,
}) {
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setIsOpen}
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
                onClick={() => setIsOpen((prev) => !prev)}
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
                {t('Modal.addGame')}
              </Dialog.Title>
              <FormAddGame
                setIsOpen={setIsOpen}
                listeGame={listeGame}
                setListeGame={setListeGame}
                currentGame={currentGame}
                setVersion={setVersion}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
