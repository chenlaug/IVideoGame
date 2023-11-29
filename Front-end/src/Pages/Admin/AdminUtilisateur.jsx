import { useState } from "react";
import SideBar from "../../Components/NavBar/SideBar";
import TableauUtilisateur from "../../Components/Tableau/TableauUtilisateur";
import AddUtilisateur from "../../Components/Modal/AddUtilisateur";
import UpdatePassword from "../../Components/Modal/UpdatePassword";
import BtnMain from "../../Components/Btn/BtnMain";

export default function AdminUtilisateur() {
  const [hovered, setHovered] = useState(false);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const [isOpenUpdatePwd, setIsOpenUpdatePwd] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(null);

  return (
    <>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? "ml-64" : "ml-16"
        }`}
      >
        <BtnMain
          label="+ Ajouter un utilisateur"
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
