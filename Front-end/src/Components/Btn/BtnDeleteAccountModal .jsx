import React, { Fragment, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dialog, Transition } from "@headlessui/react";
import { useAuthHeader } from "react-auth-kit";
import toast, { Toaster } from "react-hot-toast";
import api from "../../Utils/api";

export default function BtnDeleteAccountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const authHeader = useAuthHeader();
  const handleDeleteAccount = async () => {
    // Vous pouvez également afficher une notification de chargement
    const loadingToast = toast.loading("Suppression en cours...");

    try {
      const response = await api.delete("/user/deleteUserFromToken", {
        headers: {
          Authorization: authHeader(),
        },
      });

      // Vérifier si la suppression a été réussie
      if (response.status === 200) {
        toast.dismiss(loadingToast);
        toast.success("Votre compte a été supprimé avec succès.");

        // Fermer la modal
        closeModal();

        // Rediriger l'utilisateur vers la page de connexion ou de bienvenue
        // history.push("/welcome");
      } else {
        throw new Error(
          "Une erreur est survenue lors de la suppression du compte."
        );
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.message ||
          "Une erreur est survenue lors de la suppression du compte."
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 text-center font-medium text-light-TBleu bg-light-Yellow hover:bg-light-VCYellow border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={openModal}
      >
        Supprimer mon compte
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Suppression du compte
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Êtes-vous sûr de vouloir supprimer votre compte ? Toutes les
                    données associées seront définitivement supprimées. Cette
                    action ne peut pas être annulée.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={handleDeleteAccount}
                  >
                    Supprimer mon compte
                  </button>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Toaster />
    </>
  );
}
