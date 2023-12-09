import  { useState } from "react";
import SideBar from "../../Components/NavBar/SideBar";
import TableauAdminCommentaire from "../../Components/Tableau/TableauAdminCommentaire";

/**
 * Le composant `AdminCommentaire` est la page d'administration des commentaires.
 * Il inclut un panneau latéral de navigation (`SideBar`) et un tableau affichant
 * les commentaires (`TableauAdminCommentaire`).
 *
 * @returns {JSX.Element} - La page d'administration des commentaires.
 */

export default function AdminCommentaire() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? "ml-64" : "ml-16"
        }`}
      >
        <TableauAdminCommentaire />
      </div>
    </>
  );
}
