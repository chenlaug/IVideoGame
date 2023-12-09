import { useEffect, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuthHeader } from "react-auth-kit";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import Searchbar from "../SeachBar/Searchbar";
import Pagination from "../Pagination/Pagination";
import DeleteUser from "../Modal/DeleteUser";
import PropTypes from "prop-types";

TableauUtilisateur.propTypes = {
  setIsOpenAddUser: PropTypes.func.isRequired,
  setIsOpenUpdatePwd: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

/**
 * Le composant `TableauUtilisateur` affiche et gère une liste d'utilisateurs.
 * Il permet d'effectuer des actions comme la modification, la suppression, ou la mise à jour des mots de passe des utilisateurs.
 * Utilise plusieurs hooks d'état pour gérer l'affichage et les interactions avec l'API.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.setIsOpenAddUser - Fonction pour ouvrir/fermer la modal d'ajout d'utilisateur.
 * @param {Function} props.setIsOpenUpdatePwd - Fonction pour ouvrir/fermer la modal de mise à jour du mot de passe.
 * @param {Function} props.setCurrentUser - Fonction pour définir l'utilisateur actuel sélectionné pour la modification ou mise à jour.
 * @returns {JSX.Element} - Composant qui affiche un tableau des utilisateurs avec des options de gestion.
 */

export default function TableauUtilisateur({
  setIsOpenAddUser,
  setIsOpenUpdatePwd,
  setCurrentUser,
}) {
  const [listeUser, setListeUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [idUser, setIdUser] = useState("");
  const { t } = useTranslation();

  const userPerPage = 6;
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUser = listeUser.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const authHeader = useAuthHeader();
  useEffect(() => {
    const fetchCommentaire = async () => {
      try {
        const response = await api.get(
          `/user/getAllUsers?lastName=${searchQuery}`,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
        setListeUser(response.data);
      } catch (error) {
        toast.error(t("toast.error"));
      }
    };
    fetchCommentaire();
  }, [authHeader, listeUser, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const openModalUpdate = (user) => {
    setIsOpenAddUser(true);
    setCurrentUser(user);
  };

  const openModalUpdatePwd = (user) => {
    setIsOpenUpdatePwd(true);
    setCurrentUser(user);
  };

  const openModalDelete = (id) => {
    setIsOpenDeleteUser(true);
    setIdUser(id);
  };

  const table = currentUser.map((user) => (
    <tr key={user._id}>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {user.lastName} {user.firstName}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {user.email}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {user.role}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {user.confirmed ? "oui" : "non"}
      </td>
      <td className="p-2">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center text-lg rounded-md bg-light-Yellow text-light-TBleu hover:bg-light-VCYellow px-2 py-1">
              ...
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-40 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-light-Yellow text-light-TBleu" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => openModalUpdate(user)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      Modifier
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-light-Yellow text-light-TBleu" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => openModalUpdatePwd(user)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                      {t("Button.password")}
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-light-Yellow text-light-TBleu" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => openModalDelete(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      {t("Button.delete")}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <div className="p-10">
      <div className="flex flex-col items-center min-h-screen overflow-x-auto">
        <Searchbar query={searchQuery} handleSearch={handleSearch} />
        <table className="w-full table-auto border-collapse text-sm text-center">
          <thead>
            <tr className="bg-light-LightGray dark:bg-dark-BlackGray text-light-TBlack dark:text-dark-TWhite">
              <th className="p-2"> {t("table.Name")}</th>
              <th className="p-2"> {t("table.Email")}</th>
              <th className="p-2"> {t("table.Role")}</th>
              <th className="p-2"> {t("table.activeAccount")}</th>
              <th className="p-2"> {t("table.Option")}</th>
            </tr>
          </thead>
          <tbody className="bg-light-LightGray dark:bg-dark-BlackGray divide-y divide-gray-300">
            {table}
          </tbody>
        </table>
        <Pagination
          gamesPerPage={userPerPage}
          totalGames={currentUser.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Toaster />
      <DeleteUser
        isOpenDeleteUser={isOpenDeleteUser}
        setIsOpenDeleteUser={setIsOpenDeleteUser}
        idUser={idUser}
      />
    </div>
  );
}
