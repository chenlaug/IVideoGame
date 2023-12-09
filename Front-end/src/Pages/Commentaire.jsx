import TableauCommentaire from "../Components/Tableau/TableauCommentaire";

/**
 * Le composant `Commentaire` est un conteneur pour le composant `TableauCommentaire`.
 * Il sert de page dédiée à l'affichage et à la gestion des commentaires sur l'application.
 *
 * Ce composant ne gère pas d'état propre ou de logique complexe. Son rôle principal est de
 * rendre le composant `TableauCommentaire`, qui encapsule toute la fonctionnalité nécessaire
 * pour gérer les commentaires (comme l'affichage, la suppression, et la modification des commentaires).
 *
 * @returns {JSX.Element} - Le composant qui affiche le tableau de gestion des commentaires.
 */

export default function Commentaire() {
  return <TableauCommentaire />;
}
