import  { useState } from "react";
import SideBar from "../../Components/NavBar/SideBar";
import BtnMain from "../../Components/Btn/BtnMain";
import TableauDeveloppeur from "../../Components/Tableau/TableauDeveloppeur";
import AddDeveloppeur from "../../Components/Modal/AddDeveloppeur";

export default function AdminDevelppeur() {
  const [hovered, setHovered] = useState(false);
  const [isOpenAddDeveloppeur, setIsOpenAddDeveloppeur] = useState(false);
  const [CurrentDeveloppeur, setCurrentDeveloppeur] = useState(null);

  return (
    <div>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? "ml-64" : "ml-16"
        }`}
      >
        <BtnMain
          label="+ Ajouter un Developpeur"
          type="button"
          onClick={() => setIsOpenAddDeveloppeur(true)}
        />
        <TableauDeveloppeur
          setIsOpenAddDeveloppeur={setIsOpenAddDeveloppeur}
          setCurrentDeveloppeur={setCurrentDeveloppeur}
        />
        <AddDeveloppeur
          isOpenAddDeveloppeur={isOpenAddDeveloppeur}
          setIsOpenAddDeveloppeur={setIsOpenAddDeveloppeur}
          CurrentDeveloppeur={CurrentDeveloppeur}
        />
      </div>
    </div>
  );
}
