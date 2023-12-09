import  { useState } from "react";
import AdminGame from "./AdminGame";
import SideBar from "../../Components/NavBar/SideBar";

/**
 * Le composant `ReceptionAdmin` est la page principale de la zone d'administration.
 * Il sert de point d'entrée pour diverses fonctionnalités administratives, notamment la gestion des jeux.
 * Ce composant intègre les sous-composants suivants :
 * - `SideBar` : La barre latérale de navigation qui permet de naviguer entre différentes sections de l'administration.
 * - `AdminGame` : Un composant qui gère l'affichage et la manipulation des informations relatives aux jeux.
 *
 * L'état `hovered` est utilisé pour gérer l'état de la barre latérale (étendue ou réduite).
 * La fonction `setHovered` est utilisée pour modifier cet état.
 *
 * @returns {JSX.Element} - La page d'accueil de l'administration.
 */

export default function ReceptionAdmin() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="min-h-screen">
      <SideBar hovered={hovered} setHovered={setHovered} />
      <AdminGame hovered={hovered} />
    </div>
  );
}
