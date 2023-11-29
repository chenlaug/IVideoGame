import  { useState } from "react";
import SideBar from "../../Components/NavBar/SideBar";
import BtnMain from "../../Components/Btn/BtnMain";
import TableauEditeur from "../../Components/Tableau/TableauEditeur";
import AddEditeur from "../../Components/Modal/AddEditeur";

export default function AdminEditeur() {
  const [hovered, setHovered] = useState(false);
  const [isOpenAddEditeur, setIsOpenAddEditeur] = useState(false);
  const [CurrentEditeur, setCurrentEditeur] = useState(null);

  return (
    <div>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? "ml-64" : "ml-16"
        }`}
      >
        <BtnMain
          label="+ Ajouter un Éditeur"
          type="button"
          onClick={() => setIsOpenAddEditeur(true)}
        />
        <TableauEditeur
          setIsOpenAddEditeur={setIsOpenAddEditeur}
          setCurrentEditeur={setCurrentEditeur}
        />
        <AddEditeur
          isOpenAddEditeur={isOpenAddEditeur}
          setIsOpenAddEditeur={setIsOpenAddEditeur}
          CurrentEditeur={CurrentEditeur}
        />
      </div>
    </div>
  );
}
