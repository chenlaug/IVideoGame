import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";

export default function FormForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Sending reset password request...");
    try {
      await api.post("/user/requestPasswordReset", { email });
      toast.dismiss(loadingToast);
      toast.success(
        "Un courriel a été envoyé à votre email pour réinitialiser votre mot de passe."
      );
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.message ||
          "Une erreur s'est produite lors de la demande de réinitialisation du mot de passe. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl px-6 pt-6 pb-8 mb-4"
    >
      <div className="mb-6">
        <InputMain
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          label="Email"
          placeholder="Email"
          id="email"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="mr-2">
          <BtnMain label="Se connecter" type="submit" />
        </div>
        <BtnNavLink link="/connect" label="Revenir en arrière ?" />
      </div>
      <Toaster />
    </form>
  );
}
