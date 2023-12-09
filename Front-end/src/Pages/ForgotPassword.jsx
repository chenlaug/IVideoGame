import FormForgotPassword from "../Components/Form/FormForgotPassword";

/**
 * Le composant `ForgotPassword` est utilisé pour afficher un formulaire permettant aux utilisateurs de demander une réinitialisation de mot de passe.
 * 
 * Ce composant intègre le formulaire `FormForgotPassword`, qui permet à l'utilisateur de saisir son adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
 * L'utilisateur est guidé pour entrer son adresse e-mail, et après la soumission du formulaire, un e-mail de réinitialisation est envoyé si l'adresse e-mail est reconnue.
 * 
 * @returns {JSX.Element} - Le composant qui affiche le formulaire de demande de réinitialisation de mot de passe.
 */

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormForgotPassword />
    </div>
  );
}
