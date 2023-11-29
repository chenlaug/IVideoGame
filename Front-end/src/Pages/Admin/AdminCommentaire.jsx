import  { useState } from "react";
import SideBar from "../../Components/NavBar/SideBar";
import TableauAdminCommentaire from "../../Components/Tableau/TableauAdminCommentaire";

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
