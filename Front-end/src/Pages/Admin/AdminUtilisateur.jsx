import { useState } from "react";
import { useTranslation } from "react-i18next";
import SideBar from "../../Components/NavBar/SideBar";
import TableauUtilisateur from "../../Components/Tableau/TableauUtilisateur";
import AddUtilisateur from "../../Components/Modal/AddUtilisateur";
import UpdatePassword from "../../Components/Modal/UpdatePassword";
import BtnMain from "../../Components/Btn/BtnMain";

/**
 * Le composant `AdminUtilisateur` est la page d'administration des utilisateurs.
 * Il permet d'ajouter, de visualiser, de modifier et de gérer les utilisateurs.
 * Ce composant utilise plusieurs sous-composants :
 * - `SideBar` : La barre latérale de navigation.
 * - `BtnMain` : Un bouton pour ajouter un nouvel utilisateur.
 * - `TableauUtilisateur` : Un tableau affichant les utilisateurs existants avec des options pour les modifier ou les supprimer.
 * - `AddUtilisateur` : Un modal pour ajouter ou modifier les informations d'un utilisateur.
 * - `UpdatePassword` : Un modal pour mettre à jour le mot de passe d'un utilisateur.
 *
 * Les états `hovered`, `isOpenAddUser`, `isOpenUpdatePwd`, et `CurrentUser`
 * gèrent respectivement l'extension de la barre latérale, l'ouverture des modals pour ajouter un utilisateur ou modifier son mot de passe,
 * et l'utilisateur actuellement sélectionné pour modification ou mise à jour du mot de passe.
 *
 * @returns {JSX.Element} - La page d'administration des utilisateurs.
 */

export default function AdminUtilisateur() {
  const [hovered, setHovered] = useState(false);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const [isOpenUpdatePwd, setIsOpenUpdatePwd] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(null);
  const { t } = useTranslation();

  return (
    <>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? "ml-64" : "ml-16"
        }`}
      >
        <BtnMain
          label={t("Button.addUser")}
          type="button"
          onClick={() => setIsOpenAddUser(true)}
        />
        <TableauUtilisateur
          setIsOpenAddUser={setIsOpenAddUser}
          setIsOpenUpdatePwd={setIsOpenUpdatePwd}
          setCurrentUser={setCurrentUser}
        />
        <AddUtilisateur
          isOpenAddUser={isOpenAddUser}
          setIsOpenAddUser={setIsOpenAddUser}
          CurrentUser={CurrentUser}
        />
        <UpdatePassword
          isOpenUpdatePwd={isOpenUpdatePwd}
          setIsOpenUpdatePwd={setIsOpenUpdatePwd}
          CurrentUser={CurrentUser}
        />
      </div>
    </>
  );
}
