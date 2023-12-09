import FormLogIng from "../Components/Form/FormLogIn";

/**
 * Le composant `LogIng` est une page qui permet à l'utilisateur de se connecter à l'application.
 * 
 * Ce composant utilise `FormLogIng`, un formulaire de connexion, pour permettre à l'utilisateur de saisir ses identifiants.
 * L'utilisateur doit entrer son adresse email et son mot de passe pour accéder à son compte.
 * Ce formulaire offre également un lien vers la page de réinitialisation du mot de passe en cas d'oubli.
 * 
 * @returns {JSX.Element} - Un composant qui affiche le formulaire de connexion pour permettre à l'utilisateur de se connecter à son compte.
 */

export default function LogIng() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormLogIng />
    </div>
  );
}
