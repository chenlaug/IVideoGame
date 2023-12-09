import { useState } from "react";
import { useTranslation } from "react-i18next";
import SideBar from "../../Components/NavBar/SideBar";
import BtnMain from "../../Components/Btn/BtnMain";
import TableauDeveloppeur from "../../Components/Tableau/TableauDeveloppeur";
import AddDeveloppeur from "../../Components/Modal/AddDeveloppeur";

/**
 * Le composant `AdminDeveloppeur` est la page d'administration des développeurs.
 * Il permet d'ajouter, de visualiser et de gérer les développeurs.
 * Ce composant utilise plusieurs sous-composants :
 * - `SideBar` : Un panneau latéral de navigation.
 * - `BtnMain` : Un bouton pour ajouter un nouveau développeur.
 * - `TableauDeveloppeur` : Un tableau affichant les développeurs existants.
 * - `AddDeveloppeur` : Un modal pour ajouter ou modifier un développeur.
 *
 * Les états `hovered`, `isOpenAddDeveloppeur`, et `CurrentDeveloppeur`
 * gèrent respectivement l'affichage de la barre latérale, l'ouverture du modal,
 * et le développeur actuellement sélectionné pour modification.
 *
 * @returns {JSX.Element} - La page d'administration des développeurs.
 */

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
