import FormRegister from '../Components/Form/FormRegister';

/**
 * Le composant `Register` est utilisé pour afficher la page d'inscription de l'utilisateur.
 *
 * Il utilise le composant `FormRegister` pour permettre à l'utilisateur de s'inscrire en fournissant les informations nécessaires.
 * La page d'inscription est conçue pour être centrée sur l'écran et occupe la hauteur minimale de l'écran pour une présentation claire et accessible.
 *
 * @returns {JSX.Element} - Un composant qui rend la page d'inscription avec le formulaire d'inscription.
 */

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormRegister />
    </div>
  );
}
