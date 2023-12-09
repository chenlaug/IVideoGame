import TableauFavorisGames from "../Components/Tableau/TableauFavorisGames";

/**
 * Le composant `JeuxFavori` est une page dédiée à l'affichage des jeux vidéo favoris de l'utilisateur.
 * 
 * Ce composant utilise `TableauFavorisGames`, un composant tableau, pour lister les jeux favoris de l'utilisateur.
 * L'utilisateur peut voir les détails tels que le titre du jeu, la plateforme, la description, le type de jeu, la note, ainsi que les images du jeu et de son classement PEGI.
 * Des options sont également disponibles pour chaque jeu, permettant à l'utilisateur de supprimer un jeu de ses favoris ou d'accéder à sa page détaillée.
 * 
 * @returns {JSX.Element} - Un composant qui affiche la liste des jeux favoris de l'utilisateur avec diverses informations et actions.
 */

export default function JeuxFavori() {
  return <TableauFavorisGames />;
}
