import FormConctac from "../Components/Form/FormConctac";

/**
 * Le composant `Conctac` est une page dédiée à l'affichage du formulaire de contact.
 * Il sert de conteneur pour le composant `FormConctac`.
 *
 * Ce composant ne gère pas d'état propre ou de logique complexe. Son rôle principal est de
 * fournir une structure de mise en page pour le composant `FormConctac`, en veillant à ce qu'il
 * soit centré à l'écran, offrant ainsi une expérience utilisateur agréable et cohérente.
 *
 * @returns {JSX.Element} - Le composant qui affiche le formulaire de contact.
 */

export default function Conctac() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormConctac />
    </div>
  );
}
