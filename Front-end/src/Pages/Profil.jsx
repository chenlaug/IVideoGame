import ProfileDisplay from "../Components/Display/ProfileDisplay";

/**
 * Le composant `Profil` est conçu pour afficher la page de profil de l'utilisateur.
 * 
 * Ce composant utilise le composant `ProfileDisplay` pour afficher les informations du profil de l'utilisateur connecté.
 * La page de profil est centrée sur l'écran et prend la hauteur minimale de l'écran pour une meilleure expérience utilisateur.
 * 
 * @returns {JSX.Element} - Un composant qui affiche la page de profil de l'utilisateur.
 */

export default function Profil() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ProfileDisplay />
    </div>
  );
}
