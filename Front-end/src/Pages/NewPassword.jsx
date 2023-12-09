import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import api from "../Utils/api";
import FormNewPassword from "../Components/Form/FormNewPassword";

/**
 * Le composant `NewPassword` est une page permettant à l'utilisateur de réinitialiser son mot de passe.
 * 
 * Ce composant utilise un formulaire (`FormNewPassword`) où l'utilisateur peut entrer et confirmer son nouveau mot de passe.
 * Il utilise le token de réinitialisation du mot de passe fourni dans l'URL pour valider la demande.
 * 
 * En cas de succès, un message de confirmation s'affiche et l'utilisateur est redirigé vers la page de connexion après un court délai.
 * En cas d'erreur, comme une incompatibilité entre les mots de passe saisis, un message d'erreur est affiché.
 * 
 * @returns {JSX.Element} - Un composant qui affiche un formulaire pour permettre à l'utilisateur de réinitialiser son mot de passe.
 */

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t("toast.error"));
      return;
    }
    const loadingToastId = toast.loading(t("toast.loading"));
    try {
      const response = await api.post("/user/resetPassword", {
        token,
        newPassword,
      });
      toast.dismiss(loadingToastId);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/connect");
      }, 2000);
    } catch (error) {
      toast.dismiss(loadingToastId);

      toast.error(t("toast.error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-4xl font-titre text-center text-light-TBlack dark:text-dark-TWhite mb-4">
            {t("newPassword.resetPassword")}
          </h2>
        </div>
        <FormNewPassword
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
        />
      </div>
      <Toaster />
    </div>
  );
}
