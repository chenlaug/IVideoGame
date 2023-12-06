import { useState } from "react";
import { useTranslation } from "react-i18next";
import SideBar from "../../Components/NavBar/SideBar";
import BtnMain from "../../Components/Btn/BtnMain";
import TableauDeveloppeur from "../../Components/Tableau/TableauDeveloppeur";
import AddDeveloppeur from "../../Components/Modal/AddDeveloppeur";

export default function AdminDevelppeur() {
  const [hovered, setHovered] = useState(false);
  const [isOpenAddDeveloppeur, setIsOpenAddDeveloppeur] = useState(false);
  const [CurrentDeveloppeur, setCurrentDeveloppeur] = useState(null);
  const { t } = useTranslation();

  return (
    <div>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? "ml-64" : "ml-16"
        }`}
      >
        <BtnMain
          label={t("Button.addDeveloper")}
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
